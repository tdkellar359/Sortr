import React from 'react';
import './Header.css';
import { 
  Link
} from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      filename: null
    };
  }

  componentDidMount() {

  }

  render() {
    const { username, filename } = this.state;

    return (
      <div className="Header">
        <div className="content">
          <HeaderContent username={username} filename={filename} />
        </div>
        <div className="dummy">
          { /* Empty */ }
        </div>
      </div>
    );
  }
}

const HeaderContent = (props) => {
  const { username, filename } = props;
  const signedIn = (username !== null);

  return (
    <React.Fragment>
      <div className="left" style={{ marginLeft: '4vw' }}>
        <Link to="/home">
          <img alt="Logo"></img>
        </Link>
      </div>
      <div className="right" style={{ marginRight: '4vw' }}>
        { 
          signedIn
          ? <UserToast username={username} filename={filename} />
          : <LoginButtons />
        }
      </div>
    </React.Fragment>
  );
}

const LoginButtons = () => {
  return (
    <React.Fragment>
      <Link to="/signup">
        Sign Up
      </Link>
      <Link className="login" to="/login">
        Login
      </Link>
    </React.Fragment>
  );
}

const UserToast = (props) => {
  const { username, filename } = props;

  return (
    <React.Fragment>
      <img src={filename}></img>
      <p>Welcome, {username}</p>
    </React.Fragment>
  );
}

export default Header;