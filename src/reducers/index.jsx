import {combineReducers} from 'redux'
import {createBrowserHistory} from 'history'
import {connectRouter} from 'connected-react-router'
import user from './user'

export const history = createBrowserHistory()

export default (state, action) => {
  return combineReducers({
    user,
    router: connectRouter(history),
  })(state, action)
}
