import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import style from './LandingAppBar.module.scss';

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
  button: {
    marginLeft: 5,
    marginRight: 5
  },
  signUpButton: {
    marginLeft: 5,
    marginRight: 5,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
});

const LandingAppBar = (props) => {
  const { classes } = props;
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
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to="/login"
          >
            Log In
          </Button>
          <Button variant="outlined" color="inherit" className={classes.signUpButton}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

LandingAppBar.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(LandingAppBar);
