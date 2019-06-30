import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MainAppBar from '../Components/MainAppBar';
import LandingAppBar from '../Components/LandingAppBar';
import ImageContainer from '../Components/ImageContainer';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  container: {
    backgroundColor: theme.palette.common.white,
    minWidth: '325px'
  },
  username: {
    lineHeight: '3.75rem',
    maxHeight: '5rem',
    width: '100%',
    margin: '15px auto',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    fontWeight: 'bold'
  },
  notFoundHeading: {
    lineHeight: '2.5rem',
    maxHeight: '5rem',
    width: '100%',
    margin: '15px auto',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    fontWeight: 'bold'
  },
  notFoundSubheading: {
    lineHeight: '1.5rem',
    maxHeight: '4.75rem',
    width: 'calc(100% - 30px)',
    margin: '15px',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    fontWeight: 'bold'
  },
  [theme.breakpoints.down('xs')]: {},
  [theme.breakpoints.up('md')]: {
    container: {}
  },
  [theme.breakpoints.up('lg')]: {
    container: {}
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // user: '',
      userFound: false,
      title1: null,
      title2: null,
      title3: null,
      title4: null,
      title5: null,
      title6: null,
      imageURL1: null,
      imageURL2: null,
      imageURL3: null,
      imageURL4: null,
      imageURL5: null,
      imageURL6: null,
      loading1: null,
      loading2: null,
      loading3: null,
      loading4: null,
      loading5: null,
      loading6: null
    };

    this.loadProfileInfo = this.loadProfileInfo.bind(this);
    this.setLoading1 = this.setLoading1.bind(this);
    this.setLoading2 = this.setLoading2.bind(this);
    this.setLoading3 = this.setLoading3.bind(this);
    this.setLoading4 = this.setLoading4.bind(this);
    this.setLoading5 = this.setLoading5.bind(this);
    this.setLoading6 = this.setLoading6.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { username } = match.params;

    fetch(`/api/checkUser?username=${username}`)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          this.setState({
            // user: username,
            userFound: false
          });
          return;
        }

        this.setState({
          // user: response.username,
          userFound: true
        });
        this.resetState();
        this.loadProfileInfo(response.username);
      })
      .catch(() => {
        this.setState({
          // user: username,
          userFound: false
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props;
    const { username } = match.params;

    if (location !== prevProps.location) {
      fetch(`/api/checkUser?username=${username}`)
        .then(res => res.json())
        .then((response) => {
          if (response.error) {
            this.setState({
              // user: username,
              userFound: false
            });
            return;
          }
          // console.dir(response);

          this.setState({
            // user: response.username,
            userFound: true
          });
          this.resetState();
          this.loadProfileInfo(response.username);
        })
        .catch(() => {
          this.setState({
            // user: username,
            userFound: false
          });
        });
    }
  }

  setLoading1(loading) {
    this.setState({
      loading1: loading
    });
  }

  setLoading2(loading) {
    this.setState({
      loading2: loading
    });
  }

  setLoading3(loading) {
    this.setState({
      loading3: loading
    });
  }

  setLoading4(loading) {
    this.setState({
      loading4: loading
    });
  }

  setLoading5(loading) {
    this.setState({
      loading5: loading
    });
  }

  setLoading6(loading) {
    this.setState({
      loading6: loading
    });
  }

  resetState() {
    this.setState({
      title1: null,
      title2: null,
      title3: null,
      title4: null,
      title5: null,
      title6: null,
      imageURL1: null,
      imageURL2: null,
      imageURL3: null,
      imageURL4: null,
      imageURL5: null,
      imageURL6: null,
      loading1: null,
      loading2: null,
      loading3: null,
      loading4: null,
      loading5: null,
      loading6: null
    });
  }

  loadProfileInfo(username) {
    // const { user } = this.state;
    fetch(`/api/getBookmarksCount?username=${username}`)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          console.dir(response.error);
          // return;
        }
        // console.dir(`Bookmark Count: ${response.count}`);
      })
      .catch((error) => {
        console.dir(error);
      });

    // console.dir(`Loading profile for: ${user}`);
    fetch(`/api/getBookmarks?username=${username}&rpp=${6}&page=${1}`)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          console.dir(response.error);
          return;
        }
        // console.dir(response);
        response.forEach((painting, num) => {
          // this.setLoading(true);
          fetch(`/api/getPainting?paintingID=${painting.imageID}`)
            .then(res => res.json())
            .then((response2) => {
              switch (num) {
                case 0:
                  this.setState({
                    title1: response2.title,
                    imageURL1: response2.primaryimageurl,
                    loading1: true
                  });
                  break;
                case 1:
                  this.setState({
                    title2: response2.title,
                    imageURL2: response2.primaryimageurl,
                    loading2: true
                  });
                  break;
                case 2:
                  this.setState({
                    title3: response2.title,
                    imageURL3: response2.primaryimageurl,
                    loading3: true
                  });
                  break;
                case 3:
                  this.setState({
                    title4: response2.title,
                    imageURL4: response2.primaryimageurl,
                    loading4: true
                  });
                  break;
                case 4:
                  this.setState({
                    title5: response2.title,
                    imageURL5: response2.primaryimageurl,
                    loading5: true
                  });
                  break;
                case 5:
                  this.setState({
                    title6: response2.title,
                    imageURL6: response2.primaryimageurl,
                    loading6: true
                  });
                  break;
                default:
                  break;
              }
              // console.dir(num);
              // console.dir(response2);
            });
        });
      })
      .catch((error) => {
        console.dir(error);
      });
  }

  render() {
    const {
      classes, updateLogin, loggedIn, match
    } = this.props;
    const {
      userFound,
      title1,
      title2,
      title3,
      title4,
      title5,
      title6,
      imageURL1,
      imageURL2,
      imageURL3,
      imageURL4,
      imageURL5,
      imageURL6,
      loading1,
      loading2,
      loading3,
      loading4,
      loading5,
      loading6
    } = this.state;
    const { username } = match.params;

    return (
      <div className={`${classes.grow} ${classes.container}`}>
        {loggedIn ? (
          <MainAppBar updateLogin={updateLogin} />
        ) : (
          <LandingAppBar signupButton loginButton={false} />
        )}
        {userFound ? (
          <div>
            <Typography component="h1" variant="h2" title={username} className={classes.username}>
              {username}
            </Typography>
            <ImageContainer
              imageAlt={title1}
              imageURL={imageURL1}
              setLoading={this.setLoading1}
              loading={loading1}
            />
            <ImageContainer
              imageAlt={title2}
              imageURL={imageURL2}
              setLoading={this.setLoading2}
              loading={loading2}
            />
            <ImageContainer
              imageAlt={title3}
              imageURL={imageURL3}
              setLoading={this.setLoading3}
              loading={loading3}
            />
            <ImageContainer
              imageAlt={title4}
              imageURL={imageURL4}
              setLoading={this.setLoading4}
              loading={loading4}
            />
            <ImageContainer
              imageAlt={title5}
              imageURL={imageURL5}
              setLoading={this.setLoading5}
              loading={loading5}
            />

            <ImageContainer
              imageAlt={title6}
              imageURL={imageURL6}
              setLoading={this.setLoading6}
              loading={loading6}
            />
          </div>
        ) : (
          <div>
            <Typography
              component="h1"
              variant="h3"
              title={username}
              className={classes.notFoundHeading}
            >
              User Not Found
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              title={username}
              className={classes.notFoundSubheading}
            >
              Unable to find user:
              {' '}
              {username}
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

Profile.defaultProps = {};

Profile.propTypes = {
  classes: PropTypes.shape().isRequired,
  updateLogin: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired
};

export default withStyles(styles)(Profile);
