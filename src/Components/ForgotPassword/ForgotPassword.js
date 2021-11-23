import React, { useRef, useState } from "react";
import { Alert, Card, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { error, setError, resetPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instruction");
    } catch (error) {
      setError("Failed to reset password");
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
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
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
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-100 my-4 shadow-none"
                >
                  Reset password
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
                <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </section>
      </Container>
    </>
  );
};

export default ForgotPassword;
