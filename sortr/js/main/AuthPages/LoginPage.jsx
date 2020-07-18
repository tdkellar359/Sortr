import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Link } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import useAuth from '../../context/useAuth';

const LoginPage = () => {
  const [error, setError] = useState(false);
  const { setAuthorized } = useAuth();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    const body = {
      username: form.username.value,
      password: form.password.value,
    };

    const options = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    fetch('/api/v1/accounts/login', options)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }

        return res;
      })
      .then(() => {
        // TODO: Get filename
        setAuthorized(form.username.value, 'static/assets/default_profile_pic.png');
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  return (
    <FormWrapper>
      <h1>Login</h1>
      <hr />
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Collapse in={error}>
          <div>
            <Form.Text className="text-danger border border-danger rounded p-3 mb-2">
              Invalid username or password! Please try again.
            </Form.Text>
          </div>
        </Collapse>
        <Form.Group controlId="username">
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control required type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control required type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group>
          <Form.Text className="muted">
            Don&apos;t have an account?
            {' '}
            <Link to="signup">Sign Up</Link>
            {' '}
            now!
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default LoginPage;
