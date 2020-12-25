import dayjs from 'dayjs'

const userInitialState = () => {
  return {
    authenticated: false,
    lastAuthenticationCheck: null,
    authenticationToken: null,
    username: '',
  }
}

export default (state = userInitialState(), action) => {
  switch (action.type) {
    case 'LOGIN_FAILURE':
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
      }
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        username: action.name,
      }
    default:
      return state
  }
}
