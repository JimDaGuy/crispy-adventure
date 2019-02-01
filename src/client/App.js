import React from 'react';
import {
  HashRouter as Router, Route, Redirect, Switch
} from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Application from './Pages/Application';
import NotFound from './Pages/NotFound';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { csrf: null, loggedIn: false };

    this.updateLogin = this.updateLogin.bind(this);
  }

  componentDidMount() {
    fetch('/api/checkLogin')
      .then(res => res.json())
      .then(response => this.setState({ loggedIn: response.loggedIn }));

    fetch('/api/getToken')
      .then(res => res.json())
      .then(response => this.setState({ csrf: response.csrfToken }));
  }

  updateLogin(status, redirect) {
    fetch('/api/getToken')
      .then(res => res.json())
      .then((response) => {
        this.setState({ csrf: response.csrfToken, loggedIn: status });
        window.location = redirect;
      });
  }

  render() {
    const { csrf, loggedIn } = this.state;

    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (loggedIn ? (
              <Redirect to="/app" />
            ) : (
              <Landing
                {...props}
                csrf={csrf}
                loggedIn={loggedIn}
                updateLogin={this.updateLogin}
              />
            ))
            }
          />
          <Route
            path="/login"
            render={props => (loggedIn ? (
              <Redirect to="/app" />
            ) : (
              <Login {...props} csrf={csrf} updateLogin={this.updateLogin} />
            ))
            }
          />
          <Route
            path="/signup"
            render={props => (loggedIn ? (
              <Redirect to="/app" />
            ) : (
              <Signup {...props} csrf={csrf} updateLogin={this.updateLogin} />
            ))
            }
          />
          <Route
            path="/app"
            render={props => (!loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Application {...props} csrf={csrf} updateLogin={this.updateLogin} />
            ))
            }
          />
          <Route render={props => <NotFound {...props} csrf={csrf} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
