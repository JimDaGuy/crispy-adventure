import React from 'react';
import {
  HashRouter as Router, Route, Redirect, Switch
} from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Application from './Pages/Application';
import NotFound from './Pages/NotFound';
import './App.scss';

class App extends React.Component {
  state = { csrf: null, loggedIn: false };

  componentDidMount() {
    fetch('/api/logout');

    fetch('/api/checkLogin')
      .then(res => res.json())
      .then(response => this.setState({ loggedIn: response.loggedIn }));

    fetch('/api/getToken')
      .then(res => res.json())
      .then(response => this.setState({ csrf: response.csrfToken }));
  }

  render() {
    const { csrf, loggedIn } = this.state;

    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Landing {...props} csrf={csrf} loggedIn={loggedIn} />}
          />
          <Route
            path="/login"
            render={props => (loggedIn ? <Redirect to="/app" /> : <Login {...props} csrf={csrf} />)}
          />
          <Route
            path="/app"
            render={props => (!loggedIn ? <Redirect to="/" /> : <Application {...props} csrf={csrf} />)
            }
          />
          <Route render={props => <NotFound {...props} csrf={csrf} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
