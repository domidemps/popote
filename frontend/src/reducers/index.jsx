import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {createBrowserHistory} from 'history'

import user from 'src/reducers/user'
import notifications from 'src/reducers/notifications'

export const history = createBrowserHistory()

export default (state, action) => {
  return combineReducers({
    user,
    notifications,
    router: connectRouter(history),
  })(state, action)
}
