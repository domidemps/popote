import React from "react"
import { Provider, ReactReduxContext } from "react-redux"
import { Route, Router, Switch } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

import theme from "styles/material_ui_raw_theme_file"
import PrivateRoute from "src/containers/utils/PrivateRoute"
import { LoginView } from "src/containers/Login/LoginView"
import MainView from "src/containers/MainView"
import SignUpView from "src/containers/Login/SignUpView"
import NotificationCenter from "src/containers/utils/NotificationCenter"
import { persistor, store } from "src/store/configureStore"

require("./styles/main.css")

const Popote = ({ history }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<CircularProgress size={65} thickness={5} />}
        persistor={persistor}
      >
        <Router history={history} context={ReactReduxContext}>
          <MuiThemeProvider theme={theme}>
            <NotificationCenter />
            <Switch>
              <PrivateRoute exact path="/" component={MainView} />
              <Route exact path="/login" component={LoginView} />
              <Route exact path="/sign-up" component={SignUpView} />
              <Route render={() => <div>Not found</div>} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  )
}
export default Popote
