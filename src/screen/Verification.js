import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const Verification = () => {

  const [name,setName] = useState('');
  const [mobile,setMobile] = useState();
  const [aadhar,setAadhar] = useState();
  const [pancard,setPancard] = useState();
  const [isverify,setIsverify] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  useEffect(()=>{
    if(!userInfo){
        navigate('/login');
    }
  },[])

  return (
    <div>
        <FormContainer>
          <h1>Verification</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="mobile">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="Aadhar">
                <Form.Label>Aadhar</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Enter Mobile Number"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="mobile">
                <Form.Label>Pan Card</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Enter Mobile Number"
                  value={pancard}
                  onChange={(e) => setPancard(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
    </div>
  )
}
export default Verification