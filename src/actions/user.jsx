const logging = () => {
  return {type: 'LOGGING'}
}

const loginSuccess = token => {
  return {type: 'LOGIN_SUCCESS', token}
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

export const login = (username, password) => {
  return dispatch => {
    const loginFormData = new FormData()
    loginFormData.append('username', username)
    loginFormData.append('password', password)
    dispatch(logging())
    fetch('/token', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
      body: loginFormData,
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json)
        })
      })
      .then(data => {
        dispatch(loginSuccess(data.accessToken))
      })
      .catch(error => {
        console.error(error)
      })
  }
}
