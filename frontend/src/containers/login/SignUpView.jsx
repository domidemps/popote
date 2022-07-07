/** @jsx jsx */
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { jsx } from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { every, isEmpty } from 'lodash'
import styled from 'styled-components'

import { DARK_PURPLE } from 'src/styles/material_ui_raw_theme_file'
import { createUser } from 'src/actions/user'
import { EMAIL_VALIDITY } from 'src/helpers/regex'
import { devices } from 'src/styles/media'

import { SignUpForm } from './SignUpView/SignUpForm'
import { ConfirmationEmailDialog } from './SignUpView/ConfirmationEmailDialog'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`

const SignUpPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  align-self: center;
  min-height: 7.5rem;
  padding: 20px 0;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  @media ${devices.horizontalTablet} {
    width: 70%;
  }
  @media ${devices.verticalTablet} {
    width: 80%;
  }
`

const Title = styled(Typography)`
  margin: 0 0 10px 0;
  font-weight: 500;
  color: ${DARK_PURPLE};

  @media ${devices.horizontalTablet} {
    font-size: 1.5rem;
  }
  @media ${devices.smartphone} {
    font-size: 1.2rem;
  }
`

export default function SignUpView() {
  const dispatch = useDispatch()
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const checkUserCreation = () => {
    const isEmailValid = EMAIL_VALIDITY.test(email.toLowerCase())
    let errors = {
      username: isEmpty(username) ? 'Ce champ est obligatoire' : '',
      email: isEmpty(email) ? 'Ce champ est obligatoire' : '',
      password: isEmpty(password) ? 'Ce champ est obligatoire' : '',
      confirmedPassword: isEmpty(confirmedPassword)
        ? 'Ce champ est obligatoire'
        : '',
    }
    if (!isEmailValid) {
      errors.email = "Cet e-mail n'est pas valide"
    }
    if (password !== confirmedPassword) {
      errors.confirmedPassword = 'Le mot de passe est différent'
    }
    if (every(errors, (error) => isEmpty(error))) {
      dispatch(createUser(username, email, password, setIsDialogOpen))
    }
    setErrors(errors)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      checkUserCreation()
    }
  }

  return (
    <Layout>
      <SignUpPaper elevation={7} onKeyPress={handleKeyPress}>
        <Title variant="h4" align="center">
          Créer un compte
        </Title>
        <SignUpForm
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmedPassword={confirmedPassword}
          setConfirmedPassword={setConfirmedPassword}
          errors={errors}
          setErrors={setErrors}
          checkUserCreation={checkUserCreation}
        />
      </SignUpPaper>
      <ConfirmationEmailDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        email={email}
      />
    </Layout>
  )
}
