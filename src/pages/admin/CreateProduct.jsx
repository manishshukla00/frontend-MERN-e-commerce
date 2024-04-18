import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Adminmenu from "../../components/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    category: "",
    photo: null,
    name: "",
    description: "",
    price: "",
    quantity: "",
    shipping: "",
  });
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const [auth] = useAuth();

  const allCategories = async () => {
    try {
      const res = await axios.get(
        "https://e-commerce-backend-gn5p.onrender.com/api/v1/category/all-category"
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // const handleChange = (event) => {
  //   const { name, type } = event.target;

  //   if (type === "file") {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setFormData((prevState) => ({
  //           ...prevState,
  //           photo: reader.result,
  //         }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   } else {
  //     const { value } = event.target;
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

  // const handleCreate = (e) => {
  //   e.preventDefault();
  //   try {
  //     const productData = new FormData();
  //     // Manually append each property of formData
  //     productData.append("category", formData.category);
  //     productData.append("name", formData.name);
  //     productData.append("description", formData.description);
  //     productData.append("price", formData.price);
  //     productData.append("quantity", formData.quantity);
  //     productData.append("shipping", formData.shipping);

  //     // For the 'photo', check if it's not an empty string before appending
  //     if (formData.photo) {
  //       // Assuming formData.photo is a base64 string or a file object
  //       productData.append("photo", formData.photo);
  //     }
  //     const { data } = axios.post(
  //       "https://e-commerce-backend-gn5p.onrender.com/api/v1/product/create-product",
  //       productData,
  //       { headers: { Authorization: auth?.token } }
  //     );
  //     if (data?.success) {
  //       toast.success("Product created successfully");
  //       navigate("/dashboard/admin/products");
  //     } else {
  //       toast.error(data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong in creating product");
  //   }
  // };
  const handleChange = (event) => {
    const { name, type } = event.target;

    if (type === "file") {
      // Directly get the file object from the input field
      const file = event.target.files[0];
      if (file) {
        setFormData((prevState) => ({
          ...prevState,
          photo: file, // Store the file object directly
        }));
      }
    } else {
      const { value } = event.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      // Append other data
      productData.append("category", formData.category);
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("quantity", formData.quantity);
      productData.append("shipping", formData.shipping);

      // Append the photo if it exists
      if (formData.photo) {
        productData.append("photo", formData.photo); // Assuming formData.photo is a file object
      }

      // Make the request with axios
      const { data } = await axios.post(
        "https://e-commerce-backend-gn5p.onrender.com/api/v1/product/create-product",
        productData,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "multipart/form-data", // Make sure to set this header
          },
        }
      );

      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };

  useEffect(() => {
    allCategories();
  }, []);

  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-4">
          <Adminmenu />
        </div>
        <div className="col-md-8">
          <div className="w-75 p-4">
            <h4 className="text-center pb-4">Manage Products</h4>
            <Form onSubmit={handleCreate}>
              <Form.Group as={Row} controlId="formHorizontalCategories">
                <Col className="mb-2" sm={10}>
                  <Form.Control
                    as="select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>Select Category</option>
                    {categories?.map((elem) => {
                      return (
                        <option key={elem._id} value={elem._id}>
                          {elem.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    name="photo"
                    onChange={handleChange}
                  />
                  {formData.photo && (
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Uploaded"
                      style={{ maxWidth: "100%", marginTop: "20px" }}
                    />
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalName">
                <Col className="mb-2" sm={10}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalDescription">
                <Col className="mb-2" sm={10}>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalPrice">
                <Col className="mb-2" sm={10}>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalQuantity">
                <Col className="mb-2" sm={10}>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalShipping">
                <Col className="mb-2" sm={10}>
                  <Form.Control
                    type="text"
                    name="shipping"
                    placeholder="Shipping - *(yes or no)"
                    value={formData.shipping}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col className="mb-2" sm={{ span: 10, offset: 2 }}>
                  <Button className="mt-4" type="submit">
                    Create Product
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
