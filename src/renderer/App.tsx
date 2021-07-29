import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import * as Views from './views';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Views.Home} />
      </Switch>
    </Router>
  );
}
