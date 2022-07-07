import {applyMiddleware, compose, createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {routerMiddleware} from 'connected-react-router'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import reducers, {history} from 'src/reducers'

const middlewares = [thunk, promise, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'root',
  whitelist: ['user'],
  storage,
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
export const persistor = persistStore(store)
