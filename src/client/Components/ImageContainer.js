import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import defaultImage from '../Assets/profile.png';
// import style from './ImageContainer.module.scss';

const styles = theme => ({
  container: {
    backgroundColor: '#000000',
  },
  overlay: {
    backgroundColor: '#000000',
    opacity: '.6',
    width: '100%',
    height: '250px',
    position: 'absolute',
    top: '60',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    alignItems: 'center'
  },
  progress: {
    width: '50px',
    height: '50px'
  },
  image: {
    width: '100%',
    height: '250px'
  },
  [theme.breakpoints.up('sm')]: {
    overlay: {
      height: '300px'
    },
    image: {
      height: '300px'
    }
  },
  [theme.breakpoints.up('md')]: {
    overlay: {
      height: '400px'
    },
    image: {
      height: '400px'
    }
  },
  [theme.breakpoints.up('lg')]: {
    overlay: {
      height: '500px'
    },
    image: {
      height: '500px'
    }
  }
});

class ImageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {
      classes, imageURL, imageAlt, loading
    } = this.props;

    return (
      <div className={`${classes.container}`}>
        {loading === true ? (
          <div className={`${classes.overlay}`}>
            <CircularProgress className={classes.progress} color="secondary" />
          </div>
        ) : null}
        {imageURL === null ? (
          <img src={defaultImage} alt={imageAlt} className={`${classes.image}`} />
        ) : (
          <img src={imageURL} alt={imageAlt} className={`${classes.image}`} />
        )}
      </div>
    );
  }
}

ImageContainer.defaultProps = {
  imageURL: null,
  imageAlt: 'Default Image Title',
  loading: true
};

ImageContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  imageURL: PropTypes.string,
  imageAlt: PropTypes.string,
  loading: PropTypes.bool
};

export default withStyles(styles)(ImageContainer);
