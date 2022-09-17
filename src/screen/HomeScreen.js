import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import RoomList from "../components/RoomList";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listRooms } from "../actions/roomActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.roomList);
  // console.log(roomList);

  const { error, loading, rooms, page, pages } = roomList;
  // console.log(loading);
  // let keyword = history.location.search;
  useEffect(() => {
    dispatch(listRooms());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center">Our Rooms</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container fluid>
          <Row>
            <Col md={3} xl={3}>
              {/* {rooms.map((room) => (
                <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                  <RoomList room={room} />
                </Col>
              ))} */}
              <Row>
                <p>
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum{" "}
                </p>
                <p>
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
                  lorem ipsum lorem ipsum{" "}
                </p>
              </Row>
            </Col>
            <Col md={9} xl={9}>
              <Row>
                {rooms.map((room) => (
                  <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                    <RoomList room={room} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Paginate page={page} pages={pages} />
        </Container>
      )}
    </div>
  );
}

export default HomeScreen;
