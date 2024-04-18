import React, { useEffect, useState } from "react";
import Adminmenu from "../../components/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Products = () => {
  const [productItems, setProductItems] = useState([]);
  const [auth] = useAuth();

  const fetchImageData = async (productId) => {
    try {
      const response = await axios.get(
        `https://e-commerce-backend-gn5p.onrender.com/api/v1/product/product-photo/${productId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      // Create a local URL for the Blob
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching product image:", error);
      return ""; // Return an empty string or a placeholder image path
    }
  };

  const allProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://e-commerce-backend-gn5p.onrender.com/api/v1/product/all-products",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data && data.products) {
        // Fetch image data for each product
        const productsWithImages = await Promise.all(
          data.products.map(async (product) => {
            const imageUrl = await fetchImageData(product._id);
            return {
              ...product,
              imageUrl,
            };
          })
        );
        setProductItems(productsWithImages);
        toast.success("All Products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Something went wrong");
    }
  };

  const deleteProduct = async (id) => {
    try {
      let answer = window.prompt("Are you sure want to delete product?");
      if (answer === "yes") {
        const { data } = await axios.delete(
          `https://e-commerce-backend-gn5p.onrender.com/api/v1/product/delete-product/${id}`
        );
        if (data) {
          toast.success(data.message);
          allProducts();
        }
      } else {
        allProducts();
      }
    } catch (error) {
      toast.error("Error in delete product");
    }
  };

  useEffect(() => {
    allProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-4">
          <Adminmenu />
        </div>
        <div className="col-md-8">
          <div className="w-75">
            <h1>Products</h1>
            <div className="d-flex flex-wrap m-4 gap-4">
              {productItems.map((elem) => (
                <Card key={elem._id} style={{ width: "18rem" }}>
                  {console.log(elem)}
                  <Card.Img variant="top" src={elem.imageUrl} />

                  <Card.Body>
                    <Card.Title>{elem.name}</Card.Title>
                    <Card.Text>{elem.description}</Card.Text>
                    <Card.Text>₹ {elem.price}</Card.Text>
                    <div className="d-flex gap-2">
                      <Link to={`/dashboard/admin/update-product/${elem.slug}`}>
                        <Button variant="primary">Update</Button>
                      </Link>

                      <Button
                        onClick={() => deleteProduct(elem._id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
