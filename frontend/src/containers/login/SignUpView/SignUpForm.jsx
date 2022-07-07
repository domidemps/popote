/** @jsx jsx */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'

import { css, jsx } from '@emotion/core'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/Lock'
import MailIcon from '@material-ui/icons/Mail'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import PersonIcon from '@material-ui/icons/Person'
import { isEmpty } from 'lodash'
import styled from 'styled-components'
import zxcvbn from 'zxcvbn'

import { DARK_PURPLE } from 'src/styles/material_ui_raw_theme_file'

const StyledPersonIcon = styled(PersonIcon)`
  margin: 20px 15px 5px 5px;
  fill: ${DARK_PURPLE};
`

const StyledMailIcon = styled(MailIcon)`
  margin: 20px 15px 5px 5px;
  fill: ${DARK_PURPLE};
`

const StyledLockIcon = styled(LockIcon)`
  margin: 20px 15px 5px 5px;
  fill: ${DARK_PURPLE};
`

const FormField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 16.875rem;
  width: 55%;
`

const StyledFormControl = styled(FormControl)`
  min-width: 10.625rem;
  width: 85%;
`

const FieldLabel = styled(InputLabel)`
  .fieldValidated {
    color: green;
  }
`

const SubmitButton = styled(Button)`
  margin: 30px 0 15px 0;
`

const StrengthMeter = styled.div`
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
    width: calc(20% + 0.375rem);
    z-index: 10;
  }

  &:before {
    left: calc(20% - 0.19rem);
  }

  &:after {
    right: calc(20% - 0.19rem);
  }

  &.invisible {
    display: none;
  }
`

const StrengthMeterFill = styled.div`
  background: transparent;
  height: inherit;
  position: absolute;
  width: 0;
  border-radius: inherit;
  transition: width 0.5s ease-in-out, background 0.25s;

  &[data-strength="0"] {
    width: 20%;
    background: darkred;
  }

  &[data-strength="1"] {
    width: 40%;
    background: orangered;
  }

  &[data-strength="2"] {
    width: 60%;
    background: orange;
  }

  &[data-strength="3"] {
    width: 80%;
    background: yellowgreen;
  }

  &[data-strength="4"] {
    width: 100%;
    background: green;
  }
`

export const SignUpForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmedPassword,
  setConfirmedPassword,
  errors,
  setErrors,
  checkUserCreation,
}) => {
  const dispatch = useDispatch()
  const [passwordStrength, setPasswordStrength] = useState(0)

  const forms = [
    {
      name: 'username',
      type: 'text',
      value: username,
      helper: "Nom d'utilisateur",
      icon: <StyledPersonIcon />,
      setNewValue: setUsername,
    },
    {
      name: 'email',
      type: 'email',
      value: email,
      helper: 'E-mail',
      icon: <StyledMailIcon />,
      setNewValue: setEmail,
    },
    {
      name: 'password',
      type: 'password',
      value: password,
      helper: 'Mot de passe',
      icon: <StyledLockIcon />,
      setNewValue: setPassword,
    },
    {
      name: 'confirmedPassword',
      type: 'password',
      value: confirmedPassword,
      helper: 'Confirmer le mot de passe',
      icon: <StyledLockIcon />,
      setNewValue: setConfirmedPassword,
    },
  ]

  const onPasswordChange = (newPassword) => {
    setPassword(newPassword)
    const strength = zxcvbn(newPassword).score
    setPasswordStrength(strength)

    if (strength < 3 && !isEmpty(newPassword)) {
      setErrors({ ...errors, password: 'Mot de passe trop faible' })
    } else {
      setErrors({ ...errors, password: '' })
    }
  }

  const renderFormControl = (name, type, value, helper, icon, setNewValue) => {
    const isError = !isEmpty(errors[name])
    const isPasswordOk = passwordStrength > 2 && name === 'password'
    let label = helper

    if (isError) { label = errors[name] }
    else if (isPasswordOk) { label = 'Mot de passe sécurisé' }

    return (
      <FormField key={`signin-${name}`}>
        {icon}
        <StyledFormControl error={isError}>
          <FieldLabel
            htmlFor={`signin-input-${name}`}
            className={isPasswordOk ? 'fieldValidated' : ''}
          >
            {label}
          </FieldLabel>
          <Input
            fullWidth
            autoComplete="off"
            id={`signin-input-${name}`}
            type={type}
            value={value}
            onChange={
              name === 'password'
                ? (e) => onPasswordChange(e.target.value)
                : (e) => setNewValue(e.target.value)
            }
            required
          />
          {name === 'password' && (
            <StrengthMeter className={password.length === 0 ? 'invisible' : ''}>
              <StrengthMeterFill data-strength={passwordStrength} />
            </StrengthMeter>
          )}
        </StyledFormControl>
      </FormField>
    )
  }

  const goToLogin = () => {
    // Empty password fields for security
    setPassword('')
    setConfirmedPassword('')
    dispatch(push('/login'))
  }

  return (
    <>
      {forms.map((form) =>
        renderFormControl(
          form.name,
          form.type,
          form.value,
          form.helper,
          form.icon,
          form.setNewValue,
        ),
      )}
      <SubmitButton
        variant="contained"
        color="primary"
        onClick={() => checkUserCreation()}
      >
        Valider
      </SubmitButton>
      <Button
        color="primary"
        css={css`
          text-transform: none;
        `}
        startIcon={<NavigateBeforeIcon />}
        onClick={() => goToLogin()}
      >
        Déjà un compte ?
      </Button>
    </>
  )
}

SignUpForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirmedPassword: PropTypes.string.isRequired,
  setConfirmedPassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
  checkUserCreation: PropTypes.func.isRequired,
}
