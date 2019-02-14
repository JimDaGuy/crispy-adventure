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
    const { classes } = this.props;

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

MainAppBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  updateLogin: PropTypes.func.isRequired
};

export default withStyles(styles)(MainAppBar);
