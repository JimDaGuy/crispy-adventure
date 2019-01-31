import React from 'react';
import LandingAppBar from '../Components/LandingAppBar';
import style from './NotFound.module.scss';

class NotFound extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={style.container}>
        <LandingAppBar />
      </div>
    );
  }
}

export default NotFound;
