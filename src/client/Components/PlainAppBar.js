import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import style from './PlainAppBar.module.scss';

const styles = () => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  appName: {
    textDecoration: 'none'
  }
});

const PlainAppBar = (props) => {
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

PlainAppBar.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(PlainAppBar);
