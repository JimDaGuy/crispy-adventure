import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Application from './Pages/Application';
import NotFound from './Pages/NotFound';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  // state = { username: null };

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
  }

  render() {
    // const { username } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/app" component={Application} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
