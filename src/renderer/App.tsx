import * as React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import * as Views from './views';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Views.Home} />
      </Switch>
    </Router>
  );
};

export default App;
