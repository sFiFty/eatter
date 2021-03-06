import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import 'css/main.sass';

import Home from './components/pages/Home';
import Users from './components/pages/Users';

import rootReducer from './reducers';

typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = process.env.NODE_ENV !== 'production' ?
  createStoreWithMiddleware(rootReducer, window.devToolsExtension && window.devToolsExtension()) :
  createStoreWithMiddleware(rootReducer);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/users" component={Users} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
