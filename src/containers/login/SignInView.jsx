/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import PersonIcon from '@material-ui/icons/Person'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'
import map from 'lodash/map'

import media from 'styles/media'
import {DARK_PURPLE} from 'styles/material_ui_raw_theme_file'

const styles = css`
  display: flex;
  flex-direction: column;
  .creationPaper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    align-self: center;
    min-height: 120px;
    padding: 20px 0px;
    border-radius: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .title {
    margin: 0px 0px 10px 0px;
    font-weight: 500;
    color: ${DARK_PURPLE};
  }
  .flexRow {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .icon {
    margin: 20px 15px 5px 5px;
    fill: ${DARK_PURPLE};
  }
  ${media.horizontalTablet`
    .creationPaper {
      width: 70%;
    }
    .title {
      font-size: 1.5rem;
    }
  `}
  ${media.verticalTablet`
    .creationPaper {
      width: 80%;
    }
  `}
`

export default function SignInView() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  const forms = [
    {
      name: 'username',
      type: 'text',
      value: username,
      helper: "Nom d'utilisateur",
      icon: <PersonIcon className="icon" />,
      setNewValue: setUsername,
    },
    {
      name: 'email',
      type: 'email',
      value: email,
      helper: 'E-mail',
      icon: <MailIcon className="icon" />,
      setNewValue: setEmail,
    },
    {
      name: 'password',
      type: 'password',
      value: password,
      helper: 'Mot de passe',
      icon: <LockIcon className="icon" />,
      setNewValue: setPassword,
    },
    {
      name: 'confirmedPassword',
      type: 'password',
      value: confirmedPassword,
      helper: 'Confirmer le mot de passe',
      icon: <LockIcon className="icon" />,
      setNewValue: setConfirmedPassword,
    },
  ]
  console.log(username, email, password, confirmedPassword)

  const renderFormControl = (name, type, value, helper, icon, setNewValue) => {
    return (
      <div key={`signin-${name}`} className="flexRow">
        {icon}
        <FormControl>
          <InputLabel htmlFor={`signin-input-${name}`}>{helper}</InputLabel>
          <Input
            id={`signin-input-${name}`}
            type={type}
            value={value}
            onChange={e => setNewValue(e.target.value)}
            required
          />
        </FormControl>
      </div>
    )
  }

  return (
    <div css={styles}>
      <Paper elevation={7} className="creationPaper">
        <Typography variant="h4" align="center" className="title">
          Créer un compte
        </Typography>
        {map(forms, form => {
          return renderFormControl(
            form.name,
            form.type,
            form.value,
            form.helper,
            form.icon,
            form.setNewValue,
          )
        })}
      </Paper>
    </div>
  )
}
