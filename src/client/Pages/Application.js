import React from 'react';
import Menu from '../Components/Menu';
import style from './Application.module.scss';

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={style.container}>
        <Menu />
      </div>
    );
  }
}

export default App;
