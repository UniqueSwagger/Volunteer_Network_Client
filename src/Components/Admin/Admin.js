import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import "./Admin.css";

const Admin = () => {
  const [registeredEvents, setRegisteredEvents] = useState(null);
  //getting all register info
  useEffect(() => {
    axios
      .get("https://secure-brook-32131.herokuapp.com/registerInfo")
      .then((res) => setRegisteredEvents(res.data));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`https://secure-brook-32131.herokuapp.com/registeredEvent/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          const remaining = registeredEvents.filter(
            (event) => event._id !== id
          );
          setRegisteredEvents(remaining);
        }
      });
  };
  return (
    <>
      {!(registeredEvents === [] || registeredEvents === null) ? (
        <Container className="my-5 bg-body p-5 admin">
          <Table responsive>
            <thead className="bg-light rounded">
              <tr>
                <th className="p-3 name">Name</th>
                <th className="p-3">Email Id</th>
                <th className="p-3">Register Date</th>
                <th className="p-3">Event List</th>
                <th className="p-3 action">Action</th>
              </tr>
            </thead>
            <tbody>
              {registeredEvents?.map(({ _id, name, email, date, event }) => (
                <tr key={_id}>
                  <td className="p-3">{name}</td>
                  <td className="p-3">{email}</td>
                  <td className="p-3">{date}</td>
                  <td className="p-3">{event}</td>
                  <td className="p-3">
                    <Button
                      className="shadow-none"
                      onClick={() => handleDelete(_id)}
                      variant="danger"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Admin;
