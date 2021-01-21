/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {push} from 'connected-react-router'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import isEmpty from 'lodash/isEmpty'
import every from 'lodash/every'

import PopoteLogo from 'images/popote_logo.png'
import {login, sendForgotPassword} from 'actions/user'
import media from 'styles/media'
import {DARK_PURPLE, ERROR, INTENSE_YELLOW, MEDIUM_PURPLE} from 'styles/material_ui_raw_theme_file'
import {EMAIL_VALIDITY} from 'helpers/regex'

const styles = css`
  display: flex;
  flex-direction: column;
  height: ${window.innerHeight}px;
  .loginPaper {
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
    margin: 20px 5px;
    font-weight: 500;
    color: ${DARK_PURPLE};
  }
  .flexColumn {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .paperFlex {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .flexRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .maxSize {
    flex-grow: 1;
    width: inherit;
  }
  .logo {
    width: 60%;
  }
  .icon {
    margin: 20px 15px 5px 5px;
    fill: ${DARK_PURPLE};
  }
  .button {
    margin: 30px 0px 15px 0px;
  }
  .link {
    margin: 10px 0px 0px 90px;
  }
  .loginForm {
    width: 70%;
  }
  ${media.mediumScreen`
    .maxSize {
      width: 35rem;
    }
  `}
  ${media.horizontalTablet`
    .loginPaper {
      width: 70%;
    }
    .title {
      font-size: 1.2rem;
    }
    .logo {
      width: 50%;
    }
  `}
  ${media.verticalTablet`
    .loginPaper {
      width: 80%;
    }
    .maxSize {
      width: 45rem;
    }
  `}
  ${media.smartphone`
    .paperFlex {
      flex-direction: column;
    }
    .title {
      font-size: 1.5rem;
    }
    .loginForm {
      width: 30%;
    }
  `}
`

export default function LoginView() {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.user.authenticated)
  const wrongLogin = useSelector(state => state.user.wrongLogin)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: '',
  })
  const [dialogOpen, toggleDialog] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetPasswordErrors, setResetPasswordErrors] = useState({
    email: '',
  })

  useEffect(() => {
    if (authenticated) {
      dispatch(push('/'))
    }
  }, [authenticated])

  const goToSignIn = () => {
    dispatch(push('/sign-in'))
  }

  const checkLogin = () => {
    const isEmailValid = EMAIL_VALIDITY.test(email.toLowerCase())
    let loginErrors = {
      email: isEmpty(email) ? 'Ce champ est obligatoire' : '',
      password: isEmpty(password) ? 'Ce champ est obligatoire' : '',
    }
    if (!isEmailValid && !isEmpty(email)) {
      loginErrors.email = "Cet e-mail n'est pas valide"
    }
    if (
      every(loginErrors, error => {
        return isEmpty(error)
      })
    ) {
      dispatch(login(email, password))
    }
    setLoginErrors(loginErrors)
  }

  const checkResetEmail = () => {
    const isEmailValid = EMAIL_VALIDITY.test(resetEmail.toLowerCase())
    if (isEmpty(resetEmail)) {
      setResetPasswordErrors({email: 'Ce champ est obligatoire'})
    } else if (!isEmailValid) {
      setResetPasswordErrors({email: "Cet e-mail n'est pas valide"})
    } else {
      dispatch(sendForgotPassword(resetEmail))
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      checkLogin()
    }
  }

  const onCloseDialog = () => {
    setResetEmail('')
    toggleDialog(false)
  }

  const renderForgotPasswordDialog = () => {
    const hasError = !isEmpty(resetPasswordErrors.email)
    return (
      <Dialog open={dialogOpen} aria-labelledby="form-dialog-title" onClose={() => onCloseDialog()}>
        <DialogTitle id="form-dialog-title">Mot de passe oublié ?</DialogTitle>
        <DialogContent
          css={css`
            color: ${DARK_PURPLE};
          `}>
          Pour réinitialiser ton mot de passe, entre l'adresse e-mail utilisée lors de ton
          inscription :
          <div className="flexRow">
            <MailIcon
              css={css`
                margin: 30px 15px 5px 5px;
                fill: ${DARK_PURPLE};
              `}
            />
            <FormControl
              error={hasError}
              css={css`
                margin: 10px 10px 20px 0px;
                width: 60%;
              `}>
              <InputLabel htmlFor="forgot-pwd-input">
                {hasError ? resetPasswordErrors.email : 'E-mail'}
              </InputLabel>
              <Input
                id="forgot-pwd-input"
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
              />
            </FormControl>
            <DialogActions>
              <Button color="primary" variant="contained" onClick={() => checkResetEmail()}>
                Réinitialiser
              </Button>
              <Button color="primary" onClick={() => onCloseDialog()}>
                Annuler
              </Button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const renderFormControl = (name, value, helper, icon, setNewValue) => {
    const hasError = !isEmpty(loginErrors[name])
    return (
      <div className="flexRow">
        {icon}
        <FormControl error={hasError} className="loginForm">
          <InputLabel htmlFor={`login-${name}`}>{hasError ? loginErrors[name] : helper}</InputLabel>
          <Input
            id={`login-${name}`}
            type={name}
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
      {renderForgotPasswordDialog()}
      <Paper elevation={7} className="loginPaper paperFlex" onKeyPress={handleKeyPress}>
        <div className="flexColumn">
          <img src={PopoteLogo} alt="Popote" className="logo" />
          <Typography variant="h5" align="center" className="title">
            Toutes mes recettes, au même endroit.
          </Typography>
        </div>
        <div className="flexColumn maxSize">
          <Typography variant="h4" align="center" className="title">
            Se connecter
          </Typography>
          {renderFormControl('email', email, 'E-mail', <MailIcon className="icon" />, setEmail)}
          {renderFormControl(
            'password',
            password,
            'Mot de passe',
            <LockIcon className="icon" />,
            setPassword,
          )}
          {wrongLogin ? (
            <p
              css={css`
                color: ${ERROR};
                margin-top: 12px;
                text-align: center;
              `}>
              <strong>E-mail ou mot de passe invalide</strong>
            </p>
          ) : null}
          <Link
            component="button"
            variant="body2"
            className="link"
            onClick={() => toggleDialog(true)}>
            Mot de passe oublié ?
          </Link>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => checkLogin()}>
            C'est parti !
          </Button>
          <Button
            color="primary"
            css={css`
              text-transform: none;
            `}
            endIcon={<NavigateNextIcon />}
            onClick={() => goToSignIn()}>
            Créer un compte
          </Button>
        </div>
      </Paper>
    </div>
  )
}
