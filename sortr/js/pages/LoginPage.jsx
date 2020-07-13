import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';

const LoginPage = () => {
  const [error, setError] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
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
            Promise.reject(res.statusText);
          }

          // TODO: Do this better
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
          setError(true);
        });
    }

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <FormWrapper>
      <h1>Login</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Text className="text-danger" hidden={!error}>
          Invalid username or password!
        </Form.Text>
        <Form.Group controlId="username">
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control type="password" placeholder="Password" />
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
