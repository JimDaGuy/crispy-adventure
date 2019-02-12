import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
// import style from './RatingBar.module.scss';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  bar: {
    height: '70px',
    backgroundColor: theme.palette.grey['100']
  },
  sliderDiv: {
    height: '70px',
    padding: '0 25px',
    overflow: 'hidden'
  },
  ratingLabel: {
    margin: '5px 0 20px 0',
    fontSize: '.9em'
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
  slider: {},
  [theme.breakpoints.up('sm')]: {},
  [theme.breakpoints.up('md')]: {},
  [theme.breakpoints.up('lg')]: {}
});

class RatingBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 1
    };
  }

  componentDidMount() {}

  handleChange = (event, value) => {
    this.setState({ selectedValue: value });
  };

  render() {
    const { classes } = this.props;
    const { selectedValue } = this.state;

    return (
      <Grid container spacing={0} className={`${classes.bar}`}>
        <Grid item xs={8} sm={9} md={10} className={`${classes.sliderDiv} ${classes.grow}`}>
          <Typography id="label" className={classes.ratingLabel}>
            Rate this painting!
          </Typography>
          <Slider
            classes={{ container: classes.sliderContainer }}
            value={selectedValue}
            min={1}
            max={5}
            step={1}
            aria-labelledby="label"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.buttonDiv}>
          <Button variant="contained" color="secondary" className={classes.button}>
            Rate:
            {' '}
            {selectedValue}
            {''}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

/*
RatingBar.defaultProps = {

};
*/

RatingBar.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(RatingBar);
