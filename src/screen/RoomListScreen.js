import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listRooms, deleteRoom, createRoom } from "../actions/roomActions";
import { ROOM_CREATE_RESET } from "../constants/roomConstants";
import { useNavigate,useLocation } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

function RoomListScreen({  match }) {
  const dispatch = useDispatch();
   const history = useNavigate();
  const roomList = useSelector((state) => state.roomList);
  const { loading, error, rooms, pages, page } = roomList;

  const roomDelete = useSelector((state) => state.roomDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = roomDelete;

  const roomCreate = useSelector((state) => state.roomCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    room: createdRoom,
  } = roomCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // let keyword = history.location1.search;
  useEffect(() => {
    dispatch({ type: ROOM_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
      history('/')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdRoom._id}/edit`);
    } else {
      dispatch(listRooms());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdRoom,
    // keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteRoom(id));
    }
  };

  const createRoomHandler = () => {
    dispatch(createRoom());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Rooms</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createRoomHandler}>
            <i className="fas fa-plus"></i> Create Room
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>BED</th>
                <th>PRICE</th>
                <th>FLOOR</th>
                <th>TAGS</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.title}</td>
                  <td>{room.beds}</td>
                  <td>Rs. {room.price}</td>
                  <td>{room.floor}</td>
                  <td className="d-inline-flex"> tags : &nbsp;
                  {room.tags.map((item)=>{
                    return(
                     <> {item}</>
                    )
                  })}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/room/${room._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <AiOutlineEdit size="1rem" />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(room._id)}
                    >
                      <MdDeleteForever size="1rem" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </div>
  );
}

export default RoomListScreen;
