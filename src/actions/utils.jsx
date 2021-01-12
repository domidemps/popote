export function notify(severity, message) {
  return {type: 'NOTIFY', severity, message}
}

export function resetNotification() {
  return {type: 'RESET_NOTIFICATION'}
}
