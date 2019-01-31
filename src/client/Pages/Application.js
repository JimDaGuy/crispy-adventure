import React from 'react';
import LandingAppBar from '../Components/LandingAppBar';
import style from './Application.module.scss';

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={style.container}>
        <LandingAppBar />
      </div>
    );
  }
}

export default App;
