import dayjs from 'dayjs'

const userInitialState = () => {
  return {
    authenticated: false,
    lastAuthenticationCheck: null,
    authenticationToken: null,
  }
}

export default (state = userInitialState(), action) => {
  switch (action.type) {
    case 'LOGIN_FAILURE':
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
    default:
      return state
  }
}
