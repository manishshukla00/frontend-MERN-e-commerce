import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Policy = ({ description, keywords, author, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Container>
        <Row className="justify-content-center align-items-center pt-4">
          <Col sm={12} md={6}>
            <Image src="/images/contactus.jpeg" alt="contactus" fluid />
          </Col>
          <Col sm={4}>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Policy;
