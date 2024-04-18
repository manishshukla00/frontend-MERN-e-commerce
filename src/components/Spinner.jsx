import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SpinnerComp({ path = "login" }) {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <Container
      className="d-flex flex-column gap-8 justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1>Redirecting to you {count} second</h1>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}

export default SpinnerComp;
