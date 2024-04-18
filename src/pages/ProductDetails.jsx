import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Container>
      <Row className="align-items-center">
        <Col md={4}>
          <Image
            className="mt-4"
            width={800}
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt="Product Image"
            fluid
          />
        </Col>
        <Col className="p-4" md={8}>
          <h1>Product Name</h1>
          <p>{product.name}</p>
          <h2>Description</h2>
          <p>{product.description}</p>
          <h2>Price</h2>
          <p>₹{product.price}</p>
          <h2>Quantity</h2>
          <p>{product.quantity}</p>
          <h2>Reviews</h2>
          <p>Customer reviews.</p>
          <Button className="ms-2" variant="primary">
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
