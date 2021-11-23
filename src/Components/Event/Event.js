import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./Event.css";

const Event = ({ event: { name, image, _id } }) => {
  const history = useHistory();
  const [number, setNumber] = useState(null);
  useEffect(() => {
    setNumber(Math.floor(Math.random() * 4) + 1);
  }, []);
  const handleEventClick = () => {
    history.push(`/register/${_id}`);
  };
  return (
    <div className="col-12 col-lg-3 col-md-6 ">
      <div onClick={handleEventClick}>
        <img
          style={{ cursor: "pointer" }}
          src={
            image
              ? image
              : "https://i.ibb.co/jWRshyq/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
          }
          alt={name}
          loading="lazy"
          className="img-fluid "
        />
        <div
          style={{ cursor: "pointer" }}
          className={`${
            number === 1
              ? "bg-warning"
              : number === 2
              ? "bg-info"
              : number === 3
              ? "bg-danger"
              : "bg-primary"
          } overlay mx-auto d-flex align-items-center justify-content-center`}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default Event;
