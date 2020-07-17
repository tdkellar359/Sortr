import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import './Header.css';

const Header = () => {
  const { auth } = useAuth();

  return (
    <NavBar bg="dark" variant="dark">
      <NavBar.Brand as={Link} to={auth.authenticated ? '/browse' : '/'} className="mr-auto">
        Sortr
      </NavBar.Brand>
      <HeaderContent />
    </NavBar>
  );
};

const HeaderContent = () => {
  const {
    auth,
    signOut,
  } = useAuth();

  if (auth.authenticating) {
    return <Spinner className="mr-3" size="sm" variant="primary" animation="border" />;
  }

  const onSignOut = () => {
    const options = {
      method: 'POST',
      credentials: 'same-origin',
    };

    fetch('/api/v1/accounts/signout', options)
      .then(() => {
        signOut();
      })
      .catch((err) => console.error(err));
  };

  if (auth.authenticated) {
    return (
      <>
        <Nav variant="dark">
          <Image
            src={auth.filename}
            height={window.screen.height / 18}
            width="auto"
            roundedCircle
          />
        </Nav>
        <Nav>
          <NavDropdown title="Your Account" id="account-nav-dropdown">
            <NavDropdown.Item disabled>
              {auth.username}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/browse">
              Home
            </NavDropdown.Item>
            <NavDropdown.Item>
              Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Item>
              Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onSignOut}>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </>
    );
  }

  return (
    <Nav className="mr-sm-4">
      <Button
        variant="outline-primary"
        style={{ marginLeft: '10px' }}
        as={Link}
        to="/signup"
      >
        Sign Up
      </Button>
      <Button
        variant="outline-primary"
        style={{ marginLeft: '10px' }}
        as={Link}
        to="/login"
      >
        Log In
      </Button>
    </Nav>
  );
};

export default Header;
