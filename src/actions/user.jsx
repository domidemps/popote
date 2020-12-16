const logging = () => {
  return {type: 'LOGGING'}
}

const loginSuccess = user => {
  return {type: 'LOGIN_SUCCESS', user}
}

const loginFailure = () => {
  return {type: 'LOGIN_FAILURE'}
}

export const checkIfAuthenticated = () => {
  return dispatch => {
    dispatch(logging())
    fetch('/users/me', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json.message)
        })
      })
      .then(data => {
        dispatch(loginSuccess(data.user))
      })
      .catch(() => {
        dispatch(loginFailure())
        console.error('You are not authenticated')
      })
  }
}
