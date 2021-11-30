import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import moment from "moment";
import "./Register.css";
const Register = () => {
  const history = useHistory();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm(); // initialize the hook

  //getting all register info
  useEffect(() => {
    axios
      .get("https://secure-brook-32131.herokuapp.com/registerInfo")
      .then((res) => setRegisteredEvents(res.data));
  }, []);

  const {
    currentUser: { displayName, email },
  } = useAuth();
  const onSubmit = (data) => {
    setLoading(true);
    const month = value.getUTCMonth() + 1; //months from 1-12
    const day = value.getDate();
    const year = value.getUTCFullYear();
    const date = `${day}/${month}/${year}`;
    data.date = date;
    data.event = event.name;
    data.imgURL = event.image;
    data.displayName = displayName;
    data.email = email;
    const exist = registeredEvents.find((event) => event.event === data.event);
    if (exist) {
      window.scrollTo(0, 40);
      setError("You have already registered for this event");
      setLoading(false);
    } else {
      axios
        .post("https://secure-brook-32131.herokuapp.com/register", data)
        .then((res) => {
          if (res.data.insertedId) {
            history.push(`/registeredEvents/myEvents`);
            setLoading(false);
          }
        });
    }
  };
  const { eventId } = useParams();
  useEffect(() => {
    axios
      .get(`https://secure-brook-32131.herokuapp.com/events/${eventId}`)
      .then((res) => setEvent(res.data));
  }, [eventId]);
  return (
    <>
      {event.name ? (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "40%" }}
          className="mx-auto mb-5 border p-5"
        >
          {error && <Alert variant="danger">{error}</Alert>}
          <h4 className="mb-4">Register as a Volunteer</h4>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              {...register("name")}
              defaultValue={displayName}
              disabled
              type="text"
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email")}
              defaultValue={email}
              disabled
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <DatePicker
              className="form-control"
              onChange={onChange}
              value={value}
              required
              minDate={moment().toDate()}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register("desc")}
              as="textarea"
              placeholder="Brief about this event"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Name</Form.Label>
            <Form.Control defaultValue={event.name} disabled type="text" />
          </Form.Group>
          {loading ? (
            <Button variant="primary" className="w-100 shadow-none" disabled>
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
            <Button
              className="w-100 shadow-none"
              variant="primary"
              type="submit"
            >
              Register
            </Button>
          )}
        </Form>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Register;
