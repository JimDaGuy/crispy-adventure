import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Rating from 'react-rating';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  bar: {
    height: '70px',
    backgroundColor: theme.palette.grey['100']
  },
  ratingDiv: {
    height: '70px',
    paddingLeft: '5px',
    overflow: 'hidden'
  },
  ratingLabel: {
    margin: '5px 0',
    fontSize: '.9em'
  },
  ratingComponent: {
    '& span span span': {
      backgroundColor: `${theme.palette.secondary.main} !important`,
    }
  },
  buttonDiv: {
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    alignItems: 'center'
  },
  button: {
    marginLeft: 5,
    marginRight: 5
  },
  skipButton: {
    display: 'none'
  },
  [theme.breakpoints.up('sm')]: {
    skipButton: {
      display: 'block'
    }
  },
  [theme.breakpoints.up('md')]: {},
  [theme.breakpoints.up('lg')]: {}
});

class RatingBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: null,
      snackbarVisible: false
    };
  }

  componentDidMount() {
    this.handleChange = this.handleChange.bind(this);
    this.handleRatingButton = this.handleRatingButton.bind(this);
    this.handleSkipButton = this.handleSkipButton.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  handleChange = (value) => {
    const { updateRatingState } = this.props;
    updateRatingState(value);
    this.setState({ selectedValue: value });
  };

  handleRatingButton = () => {
    const { sendRating } = this.props;
    const { selectedValue } = this.state;

    if (selectedValue !== null) {
      sendRating();
      this.setState({
        selectedValue: null,
        snackbarVisible: false
      });
      return;
    }

    this.setState({
      snackbarVisible: true
    });
  };

  handleSkipButton = () => {
    const { getPainting } = this.props;

    this.setState({
      selectedValue: null,
      snackbarVisible: false
    });
    getPainting();
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarVisible: false
    });
  }

  render() {
    const { classes } = this.props;
    const { selectedValue, snackbarVisible } = this.state;

    return (
      <Grid container justify="center" spacing={0} className={`${classes.bar}`}>
        <Grid item xs={8} sm={8} md={5} className={`${classes.ratingDiv} ${classes.grow}`}>
          <Typography id="label" className={classes.ratingLabel}>
            Rate this painting!
          </Typography>
          <Rating
            className={`${classes.ratingComponent}`}
            initialRating={selectedValue}
            value={selectedValue}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={3} className={classes.buttonDiv}>
          <Button
            variant="contained"
            color="secondary"
            className={`${classes.button} ${classes.rateButton}`}
            onClick={this.handleRatingButton}
          >
            {selectedValue === null ? 'Rate!' : `Rate: ${selectedValue}`}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={`${classes.button} ${classes.skipButton}`}
            onClick={this.handleSkipButton}
          >
            Skip
          </Button>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarVisible}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
          message="Please select a rating."
        />
      </Grid>
    );
  }
}

/*
RatingBar.defaultProps = {

};
*/

RatingBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  getPainting: PropTypes.func.isRequired,
  sendRating: PropTypes.func.isRequired,
  updateRatingState: PropTypes.func.isRequired
};

export default withStyles(styles)(RatingBar);
