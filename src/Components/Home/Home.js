import React, { useState, useEffect } from "react";
import "./Home.css";
import { Container } from "react-bootstrap";
import Event from "../Event/Event";
import axios from "axios";
import Loader from "../Loader/Loader";
const Home = () => {
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const handleSearch = (e) => {
    setSearchedText(e.target.value);
    const matchedEvents = events.filter((event) =>
      event.name.toLowerCase().includes(searchedText.toLowerCase())
    );
    setDisplayEvents(matchedEvents);
  };
  useEffect(() => {
    axios.get("https://secure-brook-32131.herokuapp.com/events").then((res) => {
      setEvents(res.data);
      setDisplayEvents(res.data);
    });
  }, []);

  return (
    <div className="d-flex flex-column">
      <div className="my-5">
        <h2 className=" fw-bold mb-4 text-center">
          I GROW BY HELPING PEOPLE IN NEED
        </h2>
        <div className="main-search-input-wrap">
          <div className="main-search-input fl-wrap">
            <div className="main-search-input-item">
              <input
                onChange={(e) => handleSearch(e)}
                className="mb-2"
                type="text"
                placeholder="Search..."
                required
              />
            </div>
            <input
              type="submit"
              className="main-search-button"
              value="Search"
            />
          </div>
        </div>
      </div>
      <div>
        {events.length || displayEvents.length ? (
          <Container className="my-5">
            <div className="g-4 row">
              {searchedText ? (
                displayEvents.length ? (
                  displayEvents?.map((event) => (
                    <Event event={event} key={event._id} />
                  ))
                ) : (
                  <h3 className="text-center">
                    No Results Found For {searchedText}
                  </h3>
                )
              ) : (
                events?.map((event) => <Event event={event} key={event._id} />)
              )}
            </div>
          </Container>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Home;
