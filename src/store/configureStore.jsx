import {applyMiddleware, compose, createStore} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {routerMiddleware} from 'connected-react-router'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import reducers, {history} from 'reducers'

const middlewares = [thunk, promise, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['router', 'ui'],
}

const persistedRootReducer = persistReducer(persistConfig, reducers)
const createStoreWithEnhancers = composeEnhancers(applyMiddleware(...middlewares))(createStore)
export const store = createStoreWithEnhancers(persistedRootReducer)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers').default
    store.replaceReducer(nextReducer)
  })
}
