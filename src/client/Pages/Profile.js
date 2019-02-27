import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MainAppBar from '../Components/MainAppBar';
import LandingAppBar from '../Components/LandingAppBar';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  container: {
    backgroundColor: theme.palette.common.white,
    minWidth: '300px'
  },
  username: {
    lineHeight: '3.75rem',
    maxHeight: '5rem',
    width: '100%',
    margin: '15px auto',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    fontWeight: 'bold'
  },
  notFoundHeading: {
    lineHeight: '2.5rem',
    maxHeight: '5rem',
    width: '100%',
    margin: '15px auto',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    fontWeight: 'bold'
  },
  notFoundSubheading: {
    lineHeight: '1.5rem',
    maxHeight: '4.75rem',
    width: 'calc(100% - 30px)',
    margin: '15px',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    fontWeight: 'bold'
  },
  [theme.breakpoints.down('xs')]: {},
  [theme.breakpoints.up('md')]: {
    container: {}
  },
  [theme.breakpoints.up('lg')]: {
    container: {}
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      userFound: false
    };

    this.loadProfileInfo = this.loadProfileInfo.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { username } = match.params;

    fetch(`/api/checkUser?username=${username}`)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          this.setState({
            user: username,
            userFound: false
          });
          return;
        }

        this.setState({
          user: response.username,
          userFound: true
        });
        this.loadProfileInfo(response.username);
      })
      .catch(() => {
        this.setState({
          user: username,
          userFound: false
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props;
    const { username } = match.params;

    if (location !== prevProps.location) {
      fetch(`/api/checkUser?username=${username}`)
        .then(res => res.json())
        .then((response) => {
          if (response.error) {
            this.setState({
              user: username,
              userFound: false
            });
            return;
          }
          console.dir(response);

          this.setState({
            user: response.username,
            userFound: true
          });
          this.loadProfileInfo(response.username);
        })
        .catch(() => {
          this.setState({
            user: username,
            userFound: false
          });
        });
    }
  }

  loadProfileInfo(username) {
    const { user } = this.state;
    fetch(`/api/getBookmarksCount?username=${username}`)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          console.dir(response.error);
          return;
        }
        console.dir(response);
      })
      .catch((error) => {
        console.dir(error);
      });

    console.dir(user);
    fetch(`/api/getBookmarks?username=${username}&rpp=${6}&page=${1}`)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          console.dir(response.error);
          return;
        }
        console.dir(response);
      })
      .catch((error) => {
        console.dir(error);
      });
  }

  render() {
    const {
      classes, updateLogin, loggedIn, match
    } = this.props;
    const { userFound } = this.state;
    const { username } = match.params;

    return (
      <div className={`${classes.grow} ${classes.container}`}>
        {loggedIn ? (
          <MainAppBar updateLogin={updateLogin} />
        ) : (
          <LandingAppBar signupButton loginButton={false} />
        )}
        {userFound ? (
          <div>
            <Typography component="h1" variant="h2" title={username} className={classes.username}>
              {username}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography
              component="h1"
              variant="h3"
              title={username}
              className={classes.notFoundHeading}
            >
              User Not Found
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              title={username}
              className={classes.notFoundSubheading}
            >
              Unable to find user:
              {' '}
              {username}
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

Profile.defaultProps = {};

Profile.propTypes = {
  classes: PropTypes.shape().isRequired,
  updateLogin: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired
};

export default withStyles(styles)(Profile);
