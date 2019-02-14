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
    color: theme.palette.secondary.contrastText
  },
  description: {
    color: theme.palette.secondary.contrastText
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

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };

    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
  }

  componentDidMount() {}

  handleSignInSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const { updateLogin } = this.props;
    const form = $('#signInForm');
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
        if (error) {
          const errorMessage = error.responseJSON.error;
          this.setState({ error: errorMessage });
        }
      }
    });
    return false;
  }

  render() {
    const { error } = this.state;
    const { classes, csrf } = this.props;

    return (
      <div className={`${classes.grow} ${classes.container}`}>
        <LandingAppBar loginButton={false} />
        <Grid container spacing={0} color="inherit" className={classes.bannerContainer}>
          <Grid item xs={12} sm={7}>
            <form
              csrf={csrf}
              onSubmit={this.handleSignInSubmit}
              action="/api/login"
              method="POST"
              className={classes.form}
              id="signInForm"
            >
              <Typography component="h1" variant="h5" color="textPrimary">
                Sign In
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
              <Input type="hidden" name="_csrf" value={csrf || ''} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
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

Login.defaultProps = {
  csrf: ''
};

Login.propTypes = {
  classes: PropTypes.shape().isRequired,
  csrf: PropTypes.string,
  updateLogin: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);
