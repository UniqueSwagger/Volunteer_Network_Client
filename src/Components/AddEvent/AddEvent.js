import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Row, Button, Alert, Spinner } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import ImageUploader from "react-images-upload";
import { useHistory } from "react-router";

const AddEvent = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm(); // initialize the hook
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    if (!picture) {
      setError("Image is required");
      setLoading(false);
    } else {
      data.image = picture;
      axios
        .post("https://secure-brook-32131.herokuapp.com/newEvent", data)
        .then(() => setLoading(false))
        .then(() => {
          history.push("/home");
        });
    }
  };
  const [picture, setPicture] = useState("");
  const [value, onChange] = useState(new Date());
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPicture(pictureDataURLs);
  };
  return (
    <Container style={{ borderRadius: "35px" }} className="p-5 bg-white my-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row xs={1} sm={1} md={2}>
          <div style={{ width: "45%" }} className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Event Title</Form.Label>
              <Form.Control
                {...register("name")}
                required
                type="text"
                placeholder="Enter event"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-bold">Event description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                rows={3}
              />
            </Form.Group>
          </div>
          <div style={{ width: "45%" }} className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Date</Form.Label>
              <DatePicker
                className="form-control"
                onChange={onChange}
                value={value}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Banner</Form.Label>
              <div>
                {picture ? (
                  <img className="w-25" src={picture ? picture : ""} alt="" />
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  ""
                )}
                <ImageUploader
                  withIcon
                  onChange={onDrop}
                  singleImage
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </div>
            </Form.Group>
          </div>
        </Row>
        {loading ? (
          <Button
            style={{ width: "10%" }}
            variant="primary"
            className="ms-auto d-block shadow-none"
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
          <Button
            style={{ width: "10%" }}
            className="ms-auto  d-block shadow-none"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default AddEvent;
