/** @jsx jsx */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { push } from 'connected-react-router'
import { css, jsx } from '@emotion/core'
import { isEmpty, some } from 'lodash'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import LockIcon from '@material-ui/icons/Lock'
import MailIcon from '@material-ui/icons/Mail'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import styled from 'styled-components'

import { login } from 'src/actions/user'
import { EMAIL_VALIDITY } from 'src/helpers/regex'
import { DARK_PURPLE, ERROR } from 'src/styles/material_ui_raw_theme_file'
import { devices } from 'src/styles/media'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: inherit;

  @media ${devices.mediumScreen} {
    width: 35rem;
  }
  @media ${devices.verticalTablet} {
    width: 45rem;
  }
`

const Title = styled(Typography)`
  margin: 20px 5px;
  font-weight: 500;
  color: ${DARK_PURPLE};

  @media ${devices.horizontalTablet} {
    font-size: 1.2rem;
  }
  @media ${devices.smartphone} {
    font-size: 1.5rem;
  }
`

const FormField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledMailIcon = styled(MailIcon)`
  margin: 20px 15px 5px 5px;
  fill: ${DARK_PURPLE};
`

const StyledLockIcon = styled(LockIcon)`
  margin: 20px 15px 5px 5px;
  fill: ${DARK_PURPLE};
`

const ErrorMessage = styled.p`
  color: ${ERROR};
  margin-top: 12px;
  text-align: center;
`

const SubmitButton = styled(Button)`
  margin: 30px 0 15px 0;
`

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()

  const wrongLogin = useSelector((state) => state.user.wrongLogin)

  const goToSignUp = () => {
    dispatch(push('/sign-up'))
  }

  const renderFormControl = (name, value, helper, icon, setNewValue) => {
    const isError = !isEmpty(errors[name])
    return (
      <FormField>
        {icon}
        <FormControl error={isError}>
          <InputLabel htmlFor={`login-${name}`}>
            {isError ? errors[name] : helper}
          </InputLabel>
          <Input
            id={`login-${name}`}
            type={name}
            value={value}
            onChange={(e) => setNewValue(e.target.value)}
            required
          />
        </FormControl>
      </FormField>
    )
  }

  const checkLogin = () => {
    const isEmailValid = EMAIL_VALIDITY.test(email.toLowerCase())
    let errors = {
      email: isEmpty(email) ? 'Ce champ est obligatoire' : '',
      password: isEmpty(password) ? 'Ce champ est obligatoire' : '',
    }
    if (!isEmailValid) {
      errors.email = "Cet e-mail n'est pas valide"
    }
    if (some(errors, (error) => !isEmpty(error))) {
      setErrors(errors)
      return
    }
    dispatch(login(email, password))
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      checkLogin()
    }
  }

  return (
    <FormContainer onKeyPress={handleKeyPress}>
      <Title variant="h4" align="center">
        Se connecter
      </Title>

      {renderFormControl('email', email, 'E-mail', <StyledMailIcon />, setEmail)}
      {renderFormControl('password', password, "Mot de passe", <StyledLockIcon />, setPassword)}

      {wrongLogin ? (
        <ErrorMessage>
          <strong>E-mail ou mot de passe invalide</strong>
        </ErrorMessage>
      ) : null}

      <SubmitButton variant="contained" color="primary" onClick={() => checkLogin()}>
        C'est parti !
      </SubmitButton>
      <Button
        color="primary"
        css={css`
          text-transform: none;
        `}
        endIcon={<NavigateNextIcon />}
        onClick={() => goToSignUp()}
      >
        Créer un compte
      </Button>
    </FormContainer>
  )
}
