import React from 'react'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {PersistGate} from 'redux-persist/integration/react'
import CircularProgress from '@material-ui/core/CircularProgress'

import theme from './styles/material_ui_raw_theme_file'
import PrivateRoute from './containers/utils/PrivateRoute'
import LoginView from './containers/login/LoginView'
import {persistor, store} from './store/configureStore'

require('./styles/main.css')

const Popote = ({history}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<CircularProgress size={65} thickness={5} />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <Switch>
              <PrivateRoute exact path="/" component={<html>Hello world!</html>} />
              <Route exact path="/login" render={() => <LoginView />} />
              <Route render={() => <div>Not found</div>} />
            </Switch>
          </MuiThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}
export default Popote
