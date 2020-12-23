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

import PopoteLogo from '../../images/popote_logo.png'
import {DARK_PURPLE, INTENSE_YELLOW, MEDIUM_PURPLE} from '../../styles/material_ui_raw_theme_file'
import {login} from '../../actions/user'

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
    margin: 20px 0;
    font-weight: 500;
    color: ${DARK_PURPLE};
  }
  .flexColumn {
    display: flex;
    flex-direction: column;
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
  .flexRow {
    display: flex;
    flex-direction: row;
  }
  .icon {
    margin: 20px 15px 5px 5px;
    fill: ${DARK_PURPLE};
  }
  .fullwidth: {
    width: 100%;
  }
  .textField {
    padding-bottom: 15px;
  }
  .button {
    margin: 30px;
  }
`

export default function LoginView() {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.user.authenticated)
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
      <Paper elevation={7} className="loginPaper flexRow" onKeyPress={handleKeyPress}>
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
