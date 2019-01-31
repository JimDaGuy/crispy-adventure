import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Application from './Pages/Application';
import NotFound from './Pages/NotFound';
import './App.scss';

class App extends React.Component {
  // state = { username: null };
  state = { csrf: null };

  fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  componentDidMount() {
    /*
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
    */

    fetch('/api/getToken')
      .then(res => res.json())
      .then(response => this.setState({ csrf: response.csrfToken }));
  }

  render() {
    // const { username } = this.state;
    const { csrf } = this.state;

    return (
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Landing {...props} csrf={csrf} />} />
          <Route path="/login" component={Login} />
          <Route path="/app" component={Application} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
