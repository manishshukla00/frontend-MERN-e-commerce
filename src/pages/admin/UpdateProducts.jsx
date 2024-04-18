import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Adminmenu from "../../components/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";

const UpdateProducts = () => {
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
  const [product, setProduct] = useState();
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [auth] = useAuth();

  console.log(product);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-backend-gn5p.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      if (data) {
        setProduct(data.product);
        setId(data.product._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong in get single product");
    }
  };

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

  const handleUpdate = async (e) => {
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
      const { data } = await axios.put(
        `https://e-commerce-backend-gn5p.onrender.com/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating product");
    }
  };

  useEffect(() => {
    allCategories();
    getSingleProduct();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-4">
          <Adminmenu />
        </div>
        <div className="col-md-8">
          <div className="w-75 p-4">
            <h4 className="text-center pb-4">Update Products</h4>

            <Form onSubmit={handleUpdate}>
              <Form.Group as={Row} controlId="formHorizontalCategories">
                <Col className="mb-2" sm={10}>
                  <Form.Control
                    as="select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>{formData.category}</option>
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
                    placeholder={product?.name}
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
                    placeholder={product?.description}
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
                    placeholder={product?.price}
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
                    placeholder={product?.quantity}
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
                    placeholder="Shipping *(yes or no)"
                    value={formData.shipping}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col className="mb-2" sm={{ span: 10, offset: 2 }}>
                  <Button className="mt-4" type="submit">
                    Update Product
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

export default UpdateProducts;
