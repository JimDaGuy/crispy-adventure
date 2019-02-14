import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  appName: {
    textDecoration: 'none'
  },
  button: {
    marginLeft: 5,
    marginRight: 5
  },
  signUpButton: {
    marginLeft: 5,
    marginRight: 5
  }
});

const LandingAppBar = (props) => {
  const { classes, loginButton, signupButton } = props;
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
          {loginButton && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to="/login"
            >
              Log In
            </Button>
          )}
          {signupButton && (
            <Button
              variant="outlined"
              color="inherit"
              className={classes.signUpButton}
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

LandingAppBar.defaultProps = {
  loginButton: true,
  signupButton: true
};

LandingAppBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  loginButton: PropTypes.bool,
  signupButton: PropTypes.bool
};

export default withStyles(styles)(LandingAppBar);
