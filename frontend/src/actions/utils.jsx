export const notify = (severity, message) => {
  return { type: 'NOTIFY', severity, message }
}

export const resetNotification = () => {
  return { type: 'RESET_NOTIFICATION' }
}
