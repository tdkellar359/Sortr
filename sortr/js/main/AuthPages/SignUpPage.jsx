import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import useAuth from '../../context/useAuth';

const SignUpPage = () => {
  const { authenticationSuccess } = useAuth();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    setValidated(true);

    const body = {
      username: form.username.value,
      email: form.email.value,
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

    fetch('/api/v1/accounts/create', options)
      .then((res) => {
        if (!res.ok) {
          console.error(res.statusText);
          return Promise.reject(res.statusText);
        }

        // TODO: Get filename
        authenticationSuccess(form.username.value, 'static/assets/default_profile_pic.png');

        return res.json();
      })
      .catch((err) => {
        console.error(err);
        throw Error(err);
      });
  };

  return (
    <FormWrapper>
      <h1>Sign Up</h1>
      <hr />
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control type="text" placeholder="Username" required />
          <Form.Control.Feedback>
            Your username must be unique!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control type="email" placeholder="Email" />
          <Form.Text className="text-muted">
            Your email will ONLY be used to contact you if you are locked out of your account.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Password and Confirm Password must match!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>
            Confirm Password
          </Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" required />
          <Form.Control.Feedback type="invalid">
            Password and Confirm Password must match!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Text>
            Already have an account?
            {' '}
            <Link to="signup">Log In</Link>
            {' '}
            now!
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default SignUpPage;
