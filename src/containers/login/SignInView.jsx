/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import every from 'lodash/every'

import media from 'styles/media'
import {DARK_PURPLE} from 'styles/material_ui_raw_theme_file'
import {createUser} from 'actions/user'

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
  .button {
    margin: 30px 0px 15px 0px;
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
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmedPassword: '',
  })

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

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      checkUserCreation()
    }
  }

  const checkUserCreation = () => {
    let errors = {
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
    }
    if (
      every([username, email, password, confirmedPassword], element => {
        return !isEmpty(element)
      })
    ) {
      dispatch(createUser(username, email, password))
    } else {
      errors = {
        username: isEmpty(username) ? 'Ce champ est obligatoire' : '',
        email: isEmpty(email) ? 'Ce champ est obligatoire' : '',
        password: isEmpty(password) ? 'Ce champ est obligatoire' : '',
        confirmedPassword: isEmpty(confirmedPassword) ? 'Ce champ est obligatoire' : '',
      }
    }
    if (password !== confirmedPassword) {
      errors = {...errors, confirmedPassword: 'Le mot de passe est différent'}
    }
    setErrors(errors)
  }

  const renderFormControl = (name, type, value, helper, icon, setNewValue) => {
    const isError = !isEmpty(errors[name])
    return (
      <div key={`signin-${name}`} className="flexRow">
        {icon}
        <FormControl error={isError}>
          <InputLabel htmlFor={`signin-input-${name}`}>
            {isError ? errors[name] : helper}
          </InputLabel>
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
      <Paper elevation={7} className="creationPaper" onKeyPress={handleKeyPress}>
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
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => checkUserCreation()}>
          Valider
        </Button>
      </Paper>
    </div>
  )
}
