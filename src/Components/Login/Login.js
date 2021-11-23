import React, { useRef, useState } from "react";
import { Alert, Card, Form, Button, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const redirectURL = location.state?.from?.pathname || "/";
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const {
    handleSignIn,
    handleGoogleSignIn,
    error,
    setError,
    handleGithubSignIn,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await handleSignIn(emailRef.current.value, passwordRef.current.value);
      history.push(redirectURL);
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      {window.scrollTo(0, 40)}
      <Container
        className="d-flex align-items-center justify-content-center my-4 pb-3"
        style={{ minHeight: "100%" }}
      >
        <section className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log in</h2>
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
              <p className="text-center my-3">or use your email for login</p>
              {error && <Alert variant="danger">{error}</Alert>}
              <p className="text-center"></p>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email "
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
                {loading ? (
                  <Button
                    variant="primary"
                    className="w-100 my-4 shadow-none"
                    disabled
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </Button>
                ) : (
                  <Button type="submit" className="w-100 my-4 shadow-none">
                    Login
                  </Button>
                )}
              </Form>
              <div className="w-100 text-center mt-2">
                <Link to="/forget-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account?
            <Link
              to={{
                pathname: "/signup",
                state: { from: redirectURL },
              }}
            >
              Sign up
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Login;
