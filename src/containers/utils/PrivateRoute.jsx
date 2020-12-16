import {connect} from 'react-redux'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router'

import {checkIfAuthenticated} from '../../actions/user'

class PrivateRoute extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const {authenticated, checkAuthenticated} = this.props
    if (!authenticated) {
      checkAuthenticated()
    }
  }

  render() {
    const {component: newComponent, lastAuthenticationCheck, authenticated, ...rest} = this.props
    let routeRender = props => null
    if (lastAuthenticationCheck != null && !authenticated) {
      routeRender = props => <Redirect to={{pathname: '/login'}} />
    } else if (lastAuthenticationCheck != null && authenticated) {
      routeRender = props => <newComponent {...props} />
    }
    return <Route {...rest} render={routeRender} />
  }
}

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.object.isRequired]),
  checkAuthenticated: PropTypes.func,
  lastAuthenticationCheck: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.authenticated,
    lastAuthenticationCheck: state.user.lastAuthenticationCheck,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticated: () => {
      dispatch(checkIfAuthenticated())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PrivateRoute)