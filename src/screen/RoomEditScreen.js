import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Form, Button,Text } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listRoomDetails, updateRoom } from '../actions/roomActions'
import { ROOM_UPDATE_RESET } from '../constants/roomConstants'
import { useParams,useNavigate } from 'react-router-dom'


const RoomEditScreen = (props) => {
    const location = useLocation();
    // console.log(location.state)
    const params = useParams();
    const {id} = params;
    // console.log(id)
    const history = useNavigate();

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [beds, setBeds] = useState(0)
    const [room_no, setRoom_No] = useState(0)
    const [floor, setFloor] = useState(0)
    const [tags, setTags] = useState([])
    const [room_type, setRoom_type] = useState('')
    // const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const roomDetails = useSelector(state => state.roomDetails)
    const { error, loading, room } = roomDetails
    // console.log(roomDetails);
    // console.log(room.image);
    const roomUpdate = useSelector(state => state.roomUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = roomUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: ROOM_UPDATE_RESET })
            history('/admin/roomlist')
        } else {
            if (!room.title || room._id !== Number(id)) {
                dispatch(listRoomDetails(id))
            } else {
                console.log(room.tags);
                setTitle(room.title)
                setPrice(room.price)
                setImage(room.image)
                setBeds(room.beds)
                setTags(room.tags)
                setFloor(room.floor)
                setRoom_No(room.room_no)
                setRoom_type(room.room_type)
                // setTags(room.tags)
                // setCountInStock(room.countInStock)
                // setDescription(room.description)
                // Navigate('/')
            }
        }
        

    }, [dispatch, room, id, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateRoom({
            _id: id,
            title,
            price,
            beds,
            floor,
            room_type,
            room_no,
            tags,
            // description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

            formData.append('image', file)
            formData.append('room_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/rooms/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/roomlist'>
                Go Back
            </Link>

            <FormContainer>
                {location.state !== true ? <h1>Edit Room</h1>:<h1>Add Room</h1>}
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='title'>
                                <Form.Label>title</Form.Label>
                                <Form.Control

                                    type='title'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

{/* 
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group> */}


                            <Form.Group controlId='beds'>
                                <Form.Label>Beds</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter beds'
                                    value={beds}
                                    onChange={(e) => setBeds(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='floor'>
                                <Form.Label>Floor</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter stock'
                                    value={floor}
                                    onChange={(e) => setFloor(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='room_type'>
                                <Form.Label>Room Type</Form.Label>
                                <Form.Select aria-label="Default select example" value={room_type} onClick={(e) => setRoom_type(e.target.value)}>
                                    <option value="Furnished">Furnished</option>
                                    <option value="Semi-Furnished">Semi-Furnished</option>
                                    <option value="Un-Furnished">Un-Furnished</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='room_no'>
                                <Form.Label>Room No.</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter room number'
                                    value={room_no}
                                    onChange={(e) => setRoom_No(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='tags'>
                                <Form.Label>Tags</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter tags'
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            
                                {location.state !== true ? <Button type='submit' variant='primary'>Update </Button>: <Button type='submit' variant='primary'>Add </Button>}
                        
 
                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default RoomEditScreen;