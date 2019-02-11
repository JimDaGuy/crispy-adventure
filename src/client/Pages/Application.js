import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import MainAppBar from '../Components/MainAppBar';
import ImageContainer from '../Components/ImageContainer';
import RatingBar from '../Components/RatingBar';
// import style from './Application.module.scss';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  container: {
    backgroundColor: theme.palette.primary.light,
    minWidth: '300px'
  },
  [theme.breakpoints.up('md')]: {
    container: {}
  },
  [theme.breakpoints.up('lg')]: {
    container: {}
  }
});

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { classes, updateLogin } = this.props;

    return (
      <div className={`${classes.grow} ${classes.container}`}>
        <MainAppBar updateLogin={updateLogin} />
        <ImageContainer />
        <RatingBar />
      </div>
    );
  }
}

Application.defaultProps = {
  csrf: ''
};

Application.propTypes = {
  classes: PropTypes.shape().isRequired,
  csrf: PropTypes.string,
  updateLogin: PropTypes.func.isRequired
};

export default withStyles(styles)(Application);
