import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LandingAppBar from '../Components/LandingAppBar';
// import style from './NotFound.module.scss';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  container: {
    backgroundColor: theme.palette.common.white
  },
  bannerContainer: {
    backgroundColor: theme.palette.common.white,
    height: '90vh',
    padding: '20px 0'
  },
  bannerTextContainer: {
    height: '100px',
    width: '80%',
    margin: '0 10%'
  },
  h1: {
    margin: '20px 0',
    color: theme.palette.common.black
  },
  description: {
    color: theme.palette.common.black
  },
  link: {
    color: theme.palette.secondary.main
  },
  return: {
    color: theme.palette.secondary.main,
    textDecoration: 'none'
  }
});

class NotFound extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.grow} ${classes.container}`}>
        <LandingAppBar signupButton={false} loginButton={false} />
        <Grid container spacing={0} className={classes.bannerContainer}>
          <Grid item xs={12}>
            <div className={classes.bannerTextContainer}>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                className={`${classes.grow} ${classes.h1}`}
              >
                Page Not Found
              </Typography>
              <Typography
                component="h2"
                variant="h6"
                color="inherit"
                className={`${classes.grow} ${classes.description}`}
              >
                The page you were looking for at
                <span className={classes.link}>{` ${window.location} `}</span>
                doesnt seem to exist. Want to
                {' '}
                <Link to="/" className={classes.return}>
                  return home
                </Link>
                ?
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(NotFound);
