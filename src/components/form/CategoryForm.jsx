import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function CategoryForm({ handleSubmit, value, setValue, close }) {
  return (
    <Form onSubmit={handleSubmit} className="text-center m-2">
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Category Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Group>
      <Button onClick={close} variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}

export default CategoryForm;
