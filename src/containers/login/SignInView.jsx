/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import {useState} from 'react'
import {push} from 'connected-react-router'
import {useDispatch, useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import zxcvbn from 'zxcvbn'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import every from 'lodash/every'

import media from 'styles/media'
import {DARK_PURPLE} from 'styles/material_ui_raw_theme_file'
import {createUser} from 'actions/user'
import {EMAIL_VALIDITY} from 'helpers/regex'
import EmailSent from 'images/email_sent.svg'
import {resetDialog} from 'actions/utils'

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
    width: 100%;
    justify-content: center;
  }
  .icon {
    margin: 20px 15px 5px 5px;
    fill: ${DARK_PURPLE};
  }
  .button {
    margin: 30px 0px 15px 0px;
  }
  .invisible {
    display: none;
  }
  .fieldValidated {
    color: green;
  }
  .strength-meter-fill {
    background: transparent;
    height: inherit;
    position: absolute;
    width: 0;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;
    &[data-strength='0'] {
      width: 20%;
      background: darkred;
    }
    &[data-strength='1'] {
      width: 40%;
      background: orangered;
    }
    &[data-strength='2'] {
      width: 60%;
      background: orange;
    }
    &[data-strength='3'] {
      width: 80%;
      background: yellowgreen;
    }
    &[data-strength='4'] {
      width: 100%;
      background: green;
    }
  }
  .strength-meter {
    position: relative;
    height: 3px;
    background: #ddd;
    margin: 7px 0;
    border-radius: 2px;
    &:before,
    &:after {
      content: '';
      height: inherit;
      background: transparent;
      display: block;
      position: absolute;
      width: calc(20% + 6px);
      z-index: 10;
    }
    &:before {
      left: calc(20% - 3px);
    }
    &:after {
      right: calc(20% - 3px);
    }
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
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmedPassword: '',
  })
  const dialogOpen = useSelector(state => state.notifications.dialogOpen)

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

  const onPasswordChange = newPassword => {
    setPassword(newPassword)
    const strength = zxcvbn(newPassword).score
    setPasswordStrength(strength)
    if (strength < 3 && !isEmpty(newPassword)) {
      setErrors({...errors, password: 'Mot de passe trop faible'})
    } else {
      setErrors({...errors, password: ''})
    }
  }

  const goToLogin = () => {
    // Empty password fields for security
    setPassword('')
    setConfirmedPassword('')
    dispatch(push('/login'))
  }

  const checkUserCreation = () => {
    const isEmailValid = EMAIL_VALIDITY.test(email.toLowerCase())
    let errors = {
      username: isEmpty(username) ? 'Ce champ est obligatoire' : '',
      email: isEmpty(email) ? 'Ce champ est obligatoire' : '',
      password: isEmpty(password) ? 'Ce champ est obligatoire' : '',
      confirmedPassword: isEmpty(confirmedPassword) ? 'Ce champ est obligatoire' : '',
    }
    if (!isEmailValid && !isEmpty(email)) {
      errors.email = "Cet e-mail n'est pas valide"
    }
    if (password !== confirmedPassword) {
      errors.confirmedPassword = 'Le mot de passe est différent'
    }
    if (
      every(errors, error => {
        return isEmpty(error)
      })
    ) {
      dispatch(createUser(username, email, password))
    }
    setErrors(errors)
  }

  const handleDialogClose = () => {
    dispatch(resetDialog())
  }

  const renderEmailSentDialog = () => {
    return (
      <Dialog
        open={dialogOpen}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown>
        <DialogTitle id="form-dialog-title">Hop hop, dernière étape !</DialogTitle>
        <DialogContent>
          <img src={EmailSent} alt="E-mail envoyé" />
          <DialogContentText>
            Un e-mail de confirmation a été envoyé à l'adresse <u>{email}</u>
            <br />
            Clique sur le lien pour valider ton inscription et continuer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const renderFormControl = (name, type, value, helper, icon, setNewValue) => {
    const hasError = !isEmpty(errors[name])
    const strengthClass = ['strength-meter', password.length === 0 ? 'invisible' : '']
      .join(' ')
      .trim()
    const isPasswordOk = passwordStrength > 2 && name === 'password'
    let label = helper
    if (hasError) {
      label = errors[name]
    } else if (isPasswordOk) {
      label = 'Mot de passe sécurisé'
    }
    return (
      <div key={`signin-${name}`} className="flexRow">
        {icon}
        <FormControl
          error={hasError}
          css={css`
            width: 40%;
          `}>
          <InputLabel
            htmlFor={`signin-input-${name}`}
            className={isPasswordOk ? 'fieldValidated' : ''}>
            {label}
          </InputLabel>
          <Input
            autoComplete="off"
            id={`signin-input-${name}`}
            type={type}
            value={value}
            onChange={
              name === 'password'
                ? e => onPasswordChange(e.target.value)
                : e => setNewValue(e.target.value)
            }
            required
          />
          {name === 'password' ? (
            <div className={strengthClass}>
              <div className="strength-meter-fill" data-strength={passwordStrength} />
            </div>
          ) : null}
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
        <Button
          color="primary"
          css={css`
            text-transform: none;
          `}
          startIcon={<NavigateBeforeIcon />}
          onClick={() => goToLogin()}>
          Déjà un compte ?
        </Button>
      </Paper>
      {renderEmailSentDialog()}
    </div>
  )
}
