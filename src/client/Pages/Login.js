import React from 'react';
import LandingAppBar from '../Components/LandingAppBar';
import style from './Login.module.scss';

class Login extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={style.container}>
        <LandingAppBar />
      </div>
    );
  }
}

export default Login;
