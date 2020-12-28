import React from 'react'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'

import {MuiThemeProvider} from '@material-ui/core/styles'

import theme from 'styles/material_ui_raw_theme_file'

const Popote = ({store, history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <div>
            <Switch>
              <Route exact path="/" render={() => <html>Hello world!</html>} />
              <Route render={() => <div>Not found</div>} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}
export default Popote
