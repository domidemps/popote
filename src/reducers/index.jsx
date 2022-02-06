import {combineReducers} from 'redux'
import {createBrowserHistory} from 'history'
import {connectRouter} from 'connected-react-router'
import user from 'reducers/user'
import notifications from 'reducers/notifications'

export const history = createBrowserHistory()

export default (state, action) => {
  return combineReducers({
    user,
    notifications,
    router: connectRouter(history),
  })(state, action)
}
