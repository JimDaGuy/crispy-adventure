import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import LandingAppBar from '../Components/LandingAppBar';
// import style from './Landing.module.scss';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  container: {
    backgroundColor: theme.palette.primary.light
  },
  bannerContainer: {
    backgroundColor: theme.palette.primary.dark,
    height: '80vh',
    padding: '20px 0'
  },
  bannerTextContainer: {
    height: '100px',
    width: '80%',
    margin: '0 10%'
  },
  h1: {
    margin: '20px 0',
    color: theme.palette.secondary.contrastText
  },
  description: {
    color: theme.palette.secondary.contrastText
  },
  form: {
    width: '80%',
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: theme.palette.secondary.main
  }
});

class Landing extends React.Component {
  static handleSignUpSubmit(e) {
    e.stopPropogation();
    e.preventDefault();

    const form = $('#signUpForm');
    const type = 'POST';
    const url = form.attr('action');
    const data = form.serialize();
    // const success = redirect;

    $.ajax({
      cache: false,
      type,
      url,
      data,
      dataType: 'json',
      success: (response) => {
        window.location = response.redirect;
      },
      error: () => {}
    });
  }

  static stopPropagation(e) {
    e.stopPropagation();
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { classes, csrf } = this.props;

    return (
      <div className={`${classes.grow} ${classes.container}`}>
        <LandingAppBar />
        <Grid container spacing={0} color="inherit" className={classes.bannerContainer}>
          <Grid item xs={12} sm={7}>
            <div className={classes.bannerTextContainer}>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                className={`${classes.grow} ${classes.h1}`}
              >
                Rate Paintings
              </Typography>
              <Typography
                component="h2"
                variant="h6"
                color="inherit"
                className={`${classes.grow} ${classes.description}`}
              >
                PaintGauge grabs paintings from the Harvard Art Museum API for you to view and rate.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={5}>
            <form
              csrf={csrf}
              onSubmit={this.handleSignUpSubmit}
              action="/api/signup"
              method="POST"
              className={classes.form}
              id="signUpForm"
            >
              <Typography component="h1" variant="h5" color="textPrimary">
                Sign up to start rating
              </Typography>
              <FormControl margin="normal" color="inherit" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" name="username" autoComplete="username" autoFocus />
              </FormControl>
              <FormControl margin="normal" color="inherit" required fullWidth>
                <InputLabel htmlFor="pass">Password</InputLabel>
                <Input type="password" id="pass" name="pass" />
              </FormControl>
              <FormControl margin="normal" color="inherit" required fullWidth>
                <InputLabel htmlFor="pass2">Confirm Password</InputLabel>
                <Input type="password" id="pass2" name="pass2" />
              </FormControl>
              <Input type="hidden" name="_csrf" value={csrf || ''} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Account
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Landing.defaultProps = {
  csrf: ''
};

Landing.propTypes = {
  classes: PropTypes.shape().isRequired,
  csrf: PropTypes.string
};

export default withStyles(styles)(Landing);
