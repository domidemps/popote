import {combineReducers} from 'redux'
import {createBrowserHistory} from 'history'
import {connectRouter} from 'connected-react-router'

export const history = createBrowserHistory()

export default (state, action) => {
  return combineReducers({
    router: connectRouter(history),
  })(state, action)
}
