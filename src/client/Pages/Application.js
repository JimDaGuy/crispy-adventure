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

    this.state = {
      dated: null,
      id: null,
      imageURL: null,
      title: null
    };
  }

  componentDidMount() {
    fetch('/api/getRandomPainting')
      .then(res => res.json())
      .then(response => this.setState({
        dated: response.dated,
        id: response.id,
        imageURL: response.primaryimageurl,
        title: response.title
      }));
  }

  render() {
    const { classes, updateLogin, csrf } = this.props;
    const { id, imageURL, title } = this.state;

    return (
      <div className={`${classes.grow} ${classes.container}`}>
        <MainAppBar updateLogin={updateLogin} />
        <ImageContainer title={title} imageURL={imageURL} loading={false} />
        <RatingBar id={id} csrf={csrf} />
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
