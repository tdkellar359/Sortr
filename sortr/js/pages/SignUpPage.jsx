import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
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
            throw Error(res.statusText);
          }

          setValidated(true);
        })
        .catch((err) => {
          console.error(err);
          throw Error(err);
        });
    }

    event.preventDefault();
    event.stopPropagation();
  };

  if (validated) {
    return <Redirect to="/browse" />;
  }

  return (
    <FormWrapper>
      <h1>Sign Up</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control type="text" placeholder="Username" required />
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
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>
            Confirm Password
          </Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" required />
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
