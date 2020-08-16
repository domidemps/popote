import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Popote from './root'

import {store} from 'store/configureStore'
import {history} from 'reducers'

// Needed for React Developer Tools
window.React = React
window.THREE = THREE

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history}/>
    </AppContainer>,
    document.getElementById('root'),
  )
}
render(Popote)

if (module.hot) {
  module.hot.accept('./root.jsx', () => {
    const NextPopote = require('./root').default
    render(NextPopote)
  })
}
