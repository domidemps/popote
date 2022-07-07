import { notify } from 'src/actions/utils'
import { encodeParamsToUrl } from 'src/helpers/routes'

const logging = () => {
  return { type: 'LOGGING' }
}

const loginSuccess = (token) => {
  return {
    type: 'LOGIN_SUCCESS',
    token,
  }
}

const loginFailure = () => {
  return { type: 'LOGIN_FAILURE' }
}

const checkAuthenticationSuccess = (name) => {
  return {
    type: 'AUTHENTICATION_SUCCESS',
    name,
  }
}

const checkAuthenticationFailure = () => {
  return { type: 'AUTHENTICATION_FAILURE' }
}

export const logout = () => {
  return { type: 'LOGOUT' }
}

export const checkIfAuthenticated = (token) => {
  return (dispatch) => {
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
      .then((response) => {
        return response.json().then((json) => {
          return response.ok ? json : Promise.reject(json.message)
        })
      })
      .then((name) => {
        dispatch(checkAuthenticationSuccess(name))
      })
      .catch(() => {
        dispatch(checkAuthenticationFailure())
        console.error('You are not authenticated')
      })
  }
}

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(logging())

    const params = {
      username,
      password,
    }

    fetch(`${API_DOMAIN}/auth/jwt/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodeParamsToUrl(params),
      mode: 'cors',
    })
      .then((response) => {
        return response.json().then((json) => {
          return response.ok ? json : Promise.reject(json)
        })
      })
      .then((data) => {
        dispatch(loginSuccess(data.access_token))
      })
      .catch((error) => {
        dispatch(loginFailure())
        console.error(error.json)
      })
  }
}

const creatingUser = () => {
  return { type: 'CREATING_USER' }
}

export const createUser = (name, email, password, setIsDialogOpen) => {
  return (dispatch) => {
    const params = {
      email,
      password,
      is_active: true,
      is_superuser: false,
      is_verified: false,
    }
    dispatch(creatingUser())
    fetch(`${API_DOMAIN}/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        return response.json().then((json) => {
          return response.ok
            ? json
            : Promise.reject({ json, response })
        })
      })
      .then(() => setIsDialogOpen(true))
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch(notify('error', 'Cette adresse e-mail est déjà utilisée'))
        }
        console.error(error.json)
      })
  }
}
