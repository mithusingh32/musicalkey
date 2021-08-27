import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import * as Views from './views';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Views.Home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
