const logging = () => {
  return {type: 'LOGGING'}
}

const loginSuccess = token => {
  return {type: 'LOGIN_SUCCESS', token}
}

const loginFailure = () => {
  return {type: 'LOGIN_FAILURE'}
}

const checkAuthenticationSuccess = name => {
  return {type: 'AUTHENTICATION_SUCCESS', name}
}

const checkAuthenticationFailure = () => {
  return {type: 'AUTHENTICATION_FAILURE'}
}

export const logout = () => {
  return {type: 'LOGOUT'}
}

export const checkIfAuthenticated = token => {
  return dispatch => {
    dispatch(logging())
    fetch(`${API_DOMAIN}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors',
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json.message)
        })
      })
      .then(name => {
        dispatch(checkAuthenticationSuccess(name))
      })
      .catch(() => {
        dispatch(checkAuthenticationFailure())
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
        dispatch(loginSuccess(data.access_token))
      })
      .catch(error => {
        dispatch(loginFailure())
        console.error(error)
      })
  }
}

const creatingUser = () => {
  return {type: 'CREATING_USER'}
}

const createUserSuccess = () => {
  return {type: 'CREATE_USER_SUCCESS'}
}

const createUserFailure = () => {
  return {type: 'CREATE_USER_FAILURE'}
}

export const createUser = (name, email, password) => {
  const parameters = {
    name,
    email,
    password,
  }
  return dispatch => {
    dispatch(creatingUser())
    fetch(`${API_DOMAIN}/users/?` + new URLSearchParams(parameters), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      mode: 'cors',
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json)
        })
      })
      .then(dispatch(createUserSuccess()))
      .catch(error => {
        dispatch(createUserFailure())
        console.log(error)
      })
  }
}
