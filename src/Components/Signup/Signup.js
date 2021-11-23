import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import "./Signup.css";

const Signup = () => {
  const location = useLocation();
  const redirectURL = location.state?.from || "/";
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const {
    handleSignup,
    handleGoogleSignIn,
    error,
    setError,
    setUserName,
    handleGithubSignIn,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    } else if (passwordRef.current.value.length < 6) {
      return setError("password must be 6 characters long");
    }
    try {
      setError("");
      setLoading(true);
      await handleSignup(emailRef.current.value, passwordRef.current.value);
      setUserName(name);
      setError("");
      history.push(redirectURL);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  const handleUserName = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      {window.scrollTo(0, 40)}
      <Container
        className="d-flex align-items-center justify-content-center my-4 pb-3"
        style={{ minHeight: "100%" }}
      >
        <section className="w-100" style={{ maxWidth: "450px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Create account</h2>
              <div className="social-container text-center my-3">
                <i
                  onClick={() =>
                    handleGoogleSignIn()
                      .then(() => {
                        history.push(redirectURL);
                      })
                      .catch((error) => {
                        setError(error.message);
                      })
                  }
                  className="fab fa-google-plus-g"
                ></i>
                <i
                  onClick={() =>
                    handleGithubSignIn()
                      .then(() => {
                        history.push(redirectURL);
                      })
                      .catch((error) => {
                        setError(error.message);
                      })
                  }
                  className="fab fa-github"
                ></i>
              </div>
              <p className="text-center my-3">
                or use your email for registration
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) => handleUserName(e)}
                    type="text"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    ref={emailRef}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={passwordRef}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={passwordConfirmRef}
                  ></Form.Control>
                </Form.Group>
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-100 my-4 shadow-none"
                >
                  Sign up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Signup;
