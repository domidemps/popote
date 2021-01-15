from aioyagmail import AIOSMTP
from yagmail.headers import make_addr_alias_user


class CustomAIOSMTP(AIOSMTP):
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
        super().__init__(
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
        user = oauth2_info["email_address"]
        self.user, self.useralias = make_addr_alias_user(user)
        self.credentials = oauth2_info

    async def login(self):
        # aiosmtplib implementation specific
        use_tls = str(self.port) == "465"
        self.smtp_starttls = not use_tls
        await self._login_oauth2(self.credentials, use_tls)
