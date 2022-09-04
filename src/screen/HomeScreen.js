import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import RoomList from "../components/RoomList";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listRooms } from "../actions/roomActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.roomList);
  console.log(roomList);

  const { error, loading, rooms, page, pages } = roomList;
  console.log(loading);
  // let keyword = history.location.search;
  useEffect(() => {
    dispatch(listRooms());
  }, [dispatch]);

  return (
    <div>

      <h1>Our Rooms</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {rooms.map((room) => (
              <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                <RoomList room={room} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
