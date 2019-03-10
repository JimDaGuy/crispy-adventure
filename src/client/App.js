import React from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter as Router, Route, Redirect, Switch
} from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Application from './Pages/Application';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { csrf: null, loggedIn: false, username: '' };

    this.updateLogin = this.updateLogin.bind(this);
  }

  componentDidMount() {
    fetch('/api/checkLogin')
      .then(res => res.json())
      .then((response) => {
        this.setState({
          loggedIn: response.loggedIn,
          username: response.username
        });
      });

    fetch('/api/getToken')
      .then(res => res.json())
      .then(response => this.setState({ csrf: response.csrfToken }));
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location !== prevProps.location) {
      fetch('/api/checkLogin')
        .then(res => res.json())
        .then(response => this.setState({
          loggedIn: response.loggedIn,
          username: response.username
        }));
    }
  }

  updateLogin(status, redirect, username) {
    fetch('/api/getToken')
      .then(res => res.json())
      .then((response) => {
        this.setState({ csrf: response.csrfToken, loggedIn: status, username });
        window.location = redirect;
      });
  }

  render() {
    const { csrf, loggedIn, username } = this.state;

    return (
      <Router>
        <Switch>
          <Route
            path="/profile/:username"
            render={props => (
              <Profile
                {...props}
                loggedIn={loggedIn}
                username={username}
                updateLogin={this.updateLogin}
              />
            )}
          />
          <Route
            path="/app"
            render={props => (!loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Application
                {...props}
                csrf={csrf}
                username={username}
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
          <Route render={props => <NotFound {...props} csrf={csrf} />} />
        </Switch>
      </Router>
    );
  }
}

App.defaultProps = {
  location: {}
};

App.propTypes = {
  location: PropTypes.shape()
};

export default App;
