import {connect} from 'react-redux'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

import {checkIfAuthenticated} from 'actions/user'

class PrivateRoute extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const {authenticated, checkAuthenticated, authenticationToken} = this.props
    if (!authenticated) {
      checkAuthenticated(authenticationToken)
    }
  }

  render() {
    const {component: NewComponent, lastAuthenticationCheck, authenticated, ...rest} = this.props
    let routeRender = props => null
    if (lastAuthenticationCheck != null && !authenticated) {
      routeRender = props => <Redirect to={{pathname: '/login'}} />
    } else if (lastAuthenticationCheck != null && authenticated) {
      routeRender = props => <NewComponent {...props} />
    }
    return <Route {...rest} render={routeRender} />
  }
}

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
  authenticationToken: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.object.isRequired]),
  checkAuthenticated: PropTypes.func,
  lastAuthenticationCheck: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
    lastAuthenticationCheck: state.user.lastAuthenticationCheck,
    authenticationToken: state.user.authenticationToken,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticated: authenticationToken => {
      dispatch(checkIfAuthenticated(authenticationToken))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PrivateRoute)
