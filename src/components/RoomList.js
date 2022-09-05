import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function RoomList({ room }) {
  const { tags } = room;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/rooms/${room._id}`}>
        <Card.Img src={room.image} />
      </Link>

      <Card.Body>
        <Link to={`/rooms/${room._id}`}>
          <Card.Title as="div">
            <strong>{room.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text>
          {tags?.map((item, id) => {
            return (
              <div className="d-inline-flex">
                <p>{item} &nbsp;</p>
              </div>
            );
          })}
          {/* <div className="my-3">{room.tags}</div> */}
        </Card.Text>

        <Card.Text as="h3"> Rs. {room.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RoomList;
