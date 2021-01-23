import email.encoders
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate

from aioyagmail import AIOSMTP
from yagmail.headers import add_message_id, add_recipients_headers, add_subject, resolve_addresses
from yagmail.message import prepare_contents, serialize_object
from yagmail.utils import inline
from yagmail.validate import validate_email_with_regex


def prepare_message(
    user,
    useralias,
    addresses,
    subject,
    contents,
    attachments,
    headers,
    encoding,
    prettify_html=True,
    message_id=None,
    group_messages=True,
):
    """ Custom function because the \n to <br> replacement does not seem to work as expected. Hopefully it will be
    sorted in later versions of Yagmail"""

    if not isinstance(contents, (list, tuple)):
        if contents is not None:
            contents = [contents]
    if not isinstance(attachments, (list, tuple)):
        if attachments is not None:
            attachments = [attachments]

    if contents is not None:
        contents = [serialize_object(x) for x in contents]

    has_included_images, content_objects = prepare_contents(contents, encoding)
    if contents is not None:
        contents = [x[1] for x in contents]

    msg = MIMEMultipart()
    if headers is not None:
        # Strangely, msg does not have an update method, so then manually.
        for k, v in headers.items():
            msg[k] = v
    if headers is None or "Date" not in headers:
        msg["Date"] = formatdate()

    msg_alternative = MIMEMultipart("alternative")
    msg_related = MIMEMultipart("related")
    msg_related.attach("-- HTML goes here --")
    msg.attach(msg_alternative)
    add_subject(msg, subject)
    add_recipients_headers(user, useralias, msg, addresses)
    add_message_id(msg, message_id, group_messages)
    htmlstr = ""
    altstr = []
    if has_included_images:
        msg.preamble = "This message is best displayed using a MIME capable email reader."

    if contents is not None:
        for content_object, content_string in zip(content_objects, contents):
            if content_object["main_type"] == "image":
                # all image objects need base64 encoding, so do it now
                email.encoders.encode_base64(content_object["mime_object"])
                # aliased image {'path' : 'alias'}
                if isinstance(content_string, dict) and len(content_string) == 1:
                    for key in content_string:
                        hashed_ref = str(abs(hash(key)))
                        alias = content_string[key]
                    # pylint: disable=undefined-loop-variable
                    content_string = key
                else:
                    alias = os.path.basename(str(content_string))
                    hashed_ref = str(abs(hash(alias)))

                if type(content_string) == inline:
                    htmlstr += '<img src="cid:{0}" title="{1}"/>'.format(hashed_ref, alias)
                    content_object["mime_object"].add_header(
                        "Content-ID", "<{0}>".format(hashed_ref)
                    )
                    altstr.append("-- img {0} should be here -- ".format(alias))
                    # inline images should be in related MIME block
                    msg_related.attach(content_object["mime_object"])
                else:
                    # non-inline images get attached like any other attachment
                    msg.attach(content_object["mime_object"])

            else:
                if content_object["encoding"] == "base64":
                    email.encoders.encode_base64(content_object["mime_object"])
                    msg.attach(content_object["mime_object"])
                elif content_object["sub_type"] not in ["html", "plain"]:
                    msg.attach(content_object["mime_object"])
                else:
                    try:
                        htmlstr += "<div>{0}</div>".format(content_string)
                        if prettify_html:
                            import premailer
                            htmlstr = premailer.transform(htmlstr)
                    except UnicodeEncodeError:
                        htmlstr += u"<div>{0}</div>".format(content_string)
                    altstr.append(content_string)

    msg_related.get_payload()[0] = MIMEText(htmlstr, "html", _charset=encoding)
    msg_alternative.attach(MIMEText("\n".join(altstr), _charset=encoding))
    msg_alternative.attach(msg_related)
    return msg


class CustomAIOSMTP(AIOSMTP):
    """Custom class to allow using a dict containing the oauth2_info instead of a path to a JSON oauth2_file"""
    def __init__(
        self,
        oauth2_info=None,
        password=None,
        host="smtp.gmail.com",
        port=None,
        smtp_starttls=None,
        smtp_ssl=True,
        smtp_set_debuglevel=0,
        smtp_skip_login=False,
        encoding="utf-8",
        soft_email_validation=True,
        **kwargs
    ):
        user = oauth2_info["email_address"]
        super().__init__(
            user=user,
            password=password,
            host=host,
            port=port,
            smtp_starttls=smtp_starttls,
            smtp_ssl=smtp_ssl,
            smtp_set_debuglevel=smtp_set_debuglevel,
            smtp_skip_login=smtp_skip_login,
            encoding=encoding,
            soft_email_validation=soft_email_validation,
            **kwargs
        )
        self.credentials = oauth2_info

    async def login(self):
        use_tls = str(self.port) == "465"
        self.smtp_starttls = not use_tls
        await self._login_oauth2(self.credentials, use_tls)

    async def send(
        self,
        to=None,
        subject=None,
        contents=None,
        attachments=None,
        cc=None,
        bcc=None,
        preview_only=False,
        headers=None,
        prettify_html=True,
        message_id=None,
        group_messages=True,
    ):
        """ Use this to send an email with gmail"""
        recipients, msg_string = self.prepare_send(
            to,
            subject,
            contents,
            attachments,
            cc,
            bcc,
            headers,
            prettify_html,
            message_id,
            group_messages,
        )
        if preview_only:
            return recipients, msg_string
        return await self._attempt_send(recipients, msg_string)

    def prepare_send(
        self,
        to=None,
        subject=None,
        contents=None,
        attachments=None,
        cc=None,
        bcc=None,
        headers=None,
        prettify_html=True,
        message_id=None,
        group_messages=True,
    ):
        addresses = resolve_addresses(self.user, self.useralias, to, cc, bcc)

        if self.soft_email_validation:
            for email_addr in addresses["recipients"]:
                validate_email_with_regex(email_addr)

        msg = prepare_message(
            self.user,
            self.useralias,
            addresses,
            subject,
            contents,
            attachments,
            headers,
            self.encoding,
            prettify_html,
            message_id,
            group_messages,
        )

        recipients = addresses["recipients"]
        msg_string = msg.as_string()
        return recipients, msg_string
