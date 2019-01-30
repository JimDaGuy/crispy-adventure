import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment, Button } from 'semantic-ui-react';
import style from './Menu.module.scss';

class App extends React.Component {
  state = { activeItem: 'home', username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { activeItem, username } = this.state;

    return (
      <Segment className={style.segment}>
        <Menu className={style.menu}>
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Link to="/app">
            <Menu.Item name="App" active={activeItem === 'App'} />
          </Link>
          <Menu.Item
            name={username}
            active={activeItem === 'username'}
            onClick={this.handleItemClick}
          />
          <Menu.Item>
            <Button primary>Sign up</Button>
          </Menu.Item>

          <Menu.Item>
            <Button>Log-in</Button>
          </Menu.Item>
        </Menu>
      </Segment>
    );
  }
}

export default App;
