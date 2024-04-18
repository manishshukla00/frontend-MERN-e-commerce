import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

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
        "https://e-commerce-backend-gn5p.onrender.com/api/v1/auth/login",
        formData
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success(res.data.message);
        const data = JSON.stringify(res.data);
        localStorage.setItem("auth", data);
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <h1 className="text-center">Signin</h1>
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
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="mt-2">
              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
