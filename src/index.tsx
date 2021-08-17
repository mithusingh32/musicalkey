import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './renderer/App';
import '../assets/styles/__app.global.scss';
import store from './renderer/store/store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
