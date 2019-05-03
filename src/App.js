import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import userAuth from './services/authenticate';

import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/:authState" component={Auth} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      userAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default App;
