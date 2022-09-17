import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listRoomDetails } from "../actions/roomActions";

function RoomScreen({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const roomDetails = useSelector((state) => state.roomDetails);
  const { loading, error, room } = roomDetails;
  const { tags } = room;

  useEffect(() => {
    dispatch(listRoomDetails(id));
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={room.image} alt={room.title} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>beds : {room.beds}</ListGroup.Item>

                <ListGroup.Item>Price: Rs. {room.price}</ListGroup.Item>

                <ListGroup.Item>Floor: {room.floor}</ListGroup.Item>

                <ListGroup.Item>
                  tags : &nbsp;
                  {tags?.map((item, id) => {
                    return (
                      <div className="d-inline-flex">
                        <p> {item} &nbsp;</p>
                      </div>
                    );
                  })}
                </ListGroup.Item>
              </ListGroup>
              <Link to={`/verification/${room._id}`}><Button>Book Room</Button></Link>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default RoomScreen;
