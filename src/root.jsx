import React from 'react'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'
import {PersistGate} from 'redux-persist/integration/react'

import CircularProgress from '@material-ui/core/CircularProgress'
import {MuiThemeProvider} from '@material-ui/core/styles'

const Popote = ({store, history}) => {
  return (
    <PersistGate loading={<CircularProgress size={70} thickness={5} />}>
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
    </PersistGate>
  )
}
export default Popote
