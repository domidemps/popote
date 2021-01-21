const notificationsInitialState = () => {
  return {
    message: '',
    severity: '',
    dialogOpen: false,
  }
}

export default (state = notificationsInitialState(), action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        ...state,
        message: action.message,
        severity: action.severity,
      }
    case 'RESET_NOTIFICATION':
      return {
        ...state,
        message: '',
        severity: '',
      }
    case 'CREATE_USER_SUCCESS':
    case 'SEND_FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        dialogOpen: true,
      }
    case 'RESET_DIALOG':
      return {
        ...state,
        dialogOpen: false,
      }
    default:
      return state
  }
}
