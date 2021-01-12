const notificationsInitialState = () => {
  return {
    message: '',
    severity: '',
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
      return notificationsInitialState()
    default:
      return state
  }
}
