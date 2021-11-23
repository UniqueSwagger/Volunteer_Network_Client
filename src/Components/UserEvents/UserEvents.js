import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

const UserEvents = () => {
  const [userEvents, setUserEvents] = useState(null);
  const {
    currentUser: { email },
  } = useAuth();
  useEffect(() => {
    axios
      .get(`https://secure-brook-32131.herokuapp.com/registeredInfo/${email}`)
      .then((res) => setUserEvents(res.data));
  }, [email]);
  const handleCancel = (id) => {
    axios
      .delete(`https://secure-brook-32131.herokuapp.com/registeredEvent/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          const remaining = userEvents.filter((event) => event._id !== id);
          setUserEvents(remaining);
        }
      });
  };
  return (
    <>
      {userEvents ? (
        <Container className="my-5">
          {!userEvents.length ? (
            <div>
              <h1 className="text-center">You don't have any events yet</h1>
            </div>
          ) : (
            <Row xs={1} sm={2} md={2} className="g-4">
              {userEvents?.map((userEvent) => {
                const { _id, event, date, imgURL } = userEvent;
                return (
                  <div key={_id}>
                    <div
                      style={{ borderRadius: "13px" }}
                      className="d-flex bg-white p-3 justify-content-start h-100"
                    >
                      <div className="me-5 w-25">
                        <img
                          className="img-fluid "
                          loading="lazy"
                          src={imgURL}
                          alt={event}
                        />
                      </div>
                      <div>
                        <h4>{event}</h4>
                        <h5>{date}</h5>
                      </div>
                      <div className="d-block ms-auto mt-auto">
                        <Button
                          onClick={() => handleCancel(_id)}
                          className="shadow-none ms-auto "
                          variant="danger"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Row>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserEvents;
