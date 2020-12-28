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
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'
import {darken} from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'

import PopoteLogo from 'images/popote_logo.png'
import {login} from 'actions/user'
import media from 'styles/media'
import {DARK_PURPLE, ERROR, INTENSE_YELLOW, MEDIUM_PURPLE} from 'styles/material_ui_raw_theme_file'

const styles = css`
  display: flex;
  flex-direction: column;
  height: ${window.innerHeight}px;
  background: linear-gradient(${darken(MEDIUM_PURPLE, 0.3)}, ${INTENSE_YELLOW});
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
    margin: 30px;
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
  `}
`

export default function LoginView() {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.user.authenticated)
  const wrongLogin = useSelector(state => state.user.wrongLogin)
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (authenticated) {
      dispatch(push('/'))
    }
  }, [authenticated])

  const checkLogin = () => {
    if (!isEmpty(email) && !isEmpty(password)) {
      setErrors({email: '', password: ''})
      dispatch(login(email, password))
    } else {
      setErrors({
        email: isEmpty(email) ? 'Ce champ est obligatoire' : '',
        password: isEmpty(password) ? 'Ce champ est obligatoire' : '',
      })
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      checkLogin()
    }
  }

  const renderFormControl = (name, value, helper, icon, setNewValue) => {
    const isError = !isEmpty(errors[name])
    return (
      <div className="flexRow">
        {icon}
        <FormControl error={isError}>
          <InputLabel htmlFor={`login-${name}`}>{isError ? errors[name] : helper}</InputLabel>
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
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => checkLogin()}>
            C'est parti !
          </Button>
        </div>
      </Paper>
    </div>
  )
}
