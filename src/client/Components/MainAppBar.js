import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  appName: {
    textDecoration: 'none'
  },
  profileButton: {
    margin: theme.spacing.unit,
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.black
    },
    '&:active': {
      color: theme.palette.common.white
    }
  }
});

class MainAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {}

  handleLogout = () => {
    fetch('/api/logout').then(() => {
      const { updateLogin } = this.props;

      updateLogin(false, '/#/');
    });

    return false;
  };

  render() {
    const { classes, loggedIn, username } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={`${classes.grow} ${classes.appName}`}
              component={Link}
              to="/"
            >
              PaintGauge
            </Typography>
            {loggedIn && username ? (
              <a href={`/#/profile/${username}`}>
                <IconButton className={classes.profileButton} aria-label="Go to Profile">
                  <AccountCircleIcon className={classes.icon} fontSize="large" />
                </IconButton>
              </a>
            ) : null}
            <Button
              variant="outlined"
              color="inherit"
              className={classes.button}
              onClick={this.handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MainAppBar.defaultProps = {
  loggedIn: false,
  username: ''
};

MainAppBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  updateLogin: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  username: PropTypes.string
};

export default withStyles(styles)(MainAppBar);
