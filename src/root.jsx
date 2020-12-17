import React from 'react'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'
import {MuiThemeProvider} from '@material-ui/core/styles'

import theme from './styles/material_ui_raw_theme_file'
import PrivateRoute from './containers/utils/PrivateRoute'
import LoginView from './containers/login/LoginView'

require('./styles/main.css')

const Popote = ({store, history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <PrivateRoute exact path="/" component={<html>Hello world!</html>} />
            <Route exact path="/login" render={() => <LoginView />} />
            <Route render={() => <div>Not found</div>} />
          </Switch>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}
export default Popote
