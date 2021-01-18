import dayjs from 'dayjs'

const userInitialState = () => {
  return {
    authenticated: false,
    lastAuthenticationCheck: null,
    authenticationToken: '',
    username: '',
    wrongLogin: false,
    emailValidity: false,
  }
}

export default (state = userInitialState(), action) => {
  switch (action.type) {
    case 'LOGIN_FAILURE':
      return {
        ...userInitialState(),
        lastAuthenticationCheck: dayjs(),
        wrongLogin: true,
      }
    case 'AUTHENTICATION_FAILURE':
      return {
        ...userInitialState(),
        lastAuthenticationCheck: dayjs(),
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authenticationToken: action.token,
        authenticated: true,
        lastAuthenticationCheck: dayjs(),
        wrongLogin: false,
      }
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        username: action.name,
      }
    case 'LOGOUT':
      return {
        ...userInitialState(),
      }
    case 'CHECK_EMAIL_VALIDITY_SUCCESS':
      return {
        ...state,
        emailValidity: true,
      }
    case 'CHECK_EMAIL_VALIDITY_FAILURE':
      return {
        ...state,
        emailValidity: false,
      }

    default:
      return state
  }
}
