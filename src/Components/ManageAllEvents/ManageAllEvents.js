import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const ManageAllEvents = () => {
  const [events, setEvents] = React.useState([]);
  useEffect(() => {
    axios.get("https://secure-brook-32131.herokuapp.com/events").then((res) => {
      setEvents(res.data);
    });
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you wanna delete it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://secure-brook-32131.herokuapp.com/events/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire("Deleted!", "The event has been deleted.", "success");
              setEvents(events.filter((event) => event._id !== id));
            }
          });
      }
    });
  };
  return (
    <>
      {events?.length ? (
        <Container className="my-5">
          <Row xs={1} sm={2} md={2} className="g-4">
            {events?.map((singleEvent) => {
              const { _id, name, image } = singleEvent;
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
                        src={image}
                        alt={name}
                      />
                    </div>
                    <div>
                      <h4>{name}</h4>
                    </div>
                    <div className="d-block ms-auto mt-auto">
                      <Button
                        onClick={() => handleDelete(_id)}
                        className="shadow-none ms-auto "
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Row>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ManageAllEvents;
