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
    fetch(`${API_DOMAIN}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
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
    fetch(`${API_DOMAIN}/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: loginFormData,
      mode: 'cors',
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
