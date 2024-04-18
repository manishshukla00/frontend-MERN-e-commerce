import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        formData
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "71vh" }}
    >
      <Row>
        <Col md={6} lg={12}>
          <h1 className="text-center">Reset Password</h1>
          <Form className="pt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAnswer">
              <Form.Control
                type="text"
                placeholder="Favourite Sports"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
