import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import $ from 'jquery';
import LandingAppBar from '../Components/LandingAppBar';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  container: {
    backgroundColor: theme.palette.primary.light
  },
  bannerContainer: {
    backgroundColor: theme.palette.grey['100'],
    minHeight: '90vh',
    padding: '20px 0'
  },
  bannerTextContainer: {
    width: '80%',
    overflow: 'auto',
    margin: '0 10% 25px 10%'
  },
  h1: {
    margin: '20px 0',
    color: theme.palette.common.black
  },
  description: {
    color: theme.palette.common.black,
    marginBottom: '25px'
  },
  form: {
    width: '80%',
    padding: '20px',
    borderRadius: '15px',
    margin: '0 auto',
    backgroundColor: theme.palette.common.white
  },
  error: {
    marginTop: '10px',
    backgroundColor: theme.palette.error.main,
    textAlign: 'center'
  }
});

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };

    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
  }

  componentDidMount() {}

  handleSignUpSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const { updateLogin } = this.props;

    const form = $('#signUpForm');
    const type = 'POST';
    const url = form.attr('action');
    const data = form.serialize();

    $.ajax({
      cache: false,
      type,
      url,
      data,
      dataType: 'json',
      success: (response) => {
        updateLogin(true, response.redirect);
      },
      error: (error) => {
        const errorMessage = error.responseJSON.error;
        console.dir(errorMessage);
        this.setState({ error: errorMessage });
      }
    });
    return false;
  }

  render() {
    const { error } = this.state;
    const { classes, csrf } = this.props;

    return (
      <div className={`${classes.grow} ${classes.container}`}>
        <LandingAppBar />
        <Grid container spacing={0} className={classes.bannerContainer}>
          <Grid item xs={12} sm={7}>
            <div className={classes.bannerTextContainer}>
              <Typography component="h1" variant="h4" className={`${classes.grow} ${classes.h1}`}>
                Rate Paintings
              </Typography>
              <hr />
              <Typography
                component="h2"
                variant="h6"
                className={`${classes.grow} ${classes.description}`}
              >
                PaintGauge grabs paintings from the Harvard Art Museum API for you to view and rate.
              </Typography>
              <hr />
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
              <hr />
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
              {error !== '' && (
                <Paper className={classes.error} color="secondary" elevation={1}>
                  <Typography component="span">{error}</Typography>
                </Paper>
              )}
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
  csrf: PropTypes.string,
  updateLogin: PropTypes.func.isRequired
};

export default withStyles(styles)(Landing);
