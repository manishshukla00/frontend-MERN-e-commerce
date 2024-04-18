import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Contact = ({ description, keywords, author, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Container fluid>
        <Row className="align-items-center pt-4">
          <Col md={6} xs={12} className="mb-3">
            <Image src="/images/contact.jpeg" alt="About Us" fluid />
          </Col>
          <Col md={6} xs={12}>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              officiis obcaecati esse tempore unde ratione, eveniet mollitia,
              perferendis eius temporibus dicta blanditiis doloremque explicabo
              quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
              accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
              commodi illum quidem neque tempora nam.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
