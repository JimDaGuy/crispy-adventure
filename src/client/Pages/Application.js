import React from 'react';
import PropTypes from 'prop-types';
import MainAppBar from '../Components/MainAppBar';
import style from './Application.module.scss';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { updateLogin } = this.props;
    return (
      <div className={style.container}>
        <MainAppBar updateLogin={updateLogin} />
      </div>
    );
  }
}

Application.propTypes = {
  updateLogin: PropTypes.func.isRequired
};

export default Application;
