import dayjs from 'dayjs'

const userInitialState = () => {
  return {
    authenticated: false,
    lastAuthenticationCheck: null,
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
        ...action.user,
        authenticated: true,
        lastAuthenticationCheck: dayjs(),
      }
    default:
      return state
  }
}
