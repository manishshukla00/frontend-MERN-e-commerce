import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../context/auth";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

let prices = [
  { id: 0, range: "₹0-₹100", array: [0, 100] },
  { id: 1, range: "₹101-₹200", array: [101, 200] },
  { id: 2, range: "₹201-₹300", array: [201, 300] },
  { id: 3, range: "₹301-₹400", array: [301, 400] },
  { id: 4, range: "₹401-₹500", array: [401, 500] },
  { id: 5, range: "₹501-₹1000", array: [501, 1000] },
  { id: 6, range: "₹1001-₹2000", array: [1001, 2000] },
];

const Home = ({ description, keywords, author, title }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [productItems, setProductItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [visbleProducts, setVisibleProducts] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");

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
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching product image:", error);
      return "";
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
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Something went wrong");
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
      return;
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all.filter((elem) => elem !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) allProducts();
    allCategories();
  }, [!checked.length, !radio.length]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://e-commerce-backend-gn5p.onrender.com/api/v1/product/product-filter",
        { checked, radio }
      );
      setProductItems(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 2); // Load 2 more products each time
  };

  const filterProductsByName = () => {
    const filteredItems = productItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductItems(filteredItems);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      filterProductsByName();
    } else {
      allProducts(); // Reset to all products when the search term is cleared
    }
  }, [searchTerm, filterProductsByName]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    allCategories();
  }, [checked, radio, filterProduct]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <div className="Home">
        <Container fluid>
          <Row>
            {/* category & price filter */}
            <Col sm={3} className="filter-section mt-2">
              <div>
                <Form action="">
                  <h4 className="mt-4 mb-4">Search by Category</h4>
                  {categories?.map((elem) => {
                    return (
                      <Form.Check
                        key={elem._id}
                        type="checkbox"
                        label={elem.name}
                        onChange={(e) =>
                          handleFilter(e.target.checked, elem._id)
                        }
                      />
                    );
                  })}
                  <h4 className="mt-4 mb-4">Search by Price</h4>
                  {prices.map((elem) => {
                    return (
                      <Form.Check
                        key={elem.id}
                        value={JSON.stringify(elem.array)} // Convert the array to a string
                        type="radio"
                        name="priceGroup"
                        label={elem.range}
                        onChange={(e) => {
                          const valueArray = JSON.parse(e.target.value); // Parse the string back into an array
                          setRadio(valueArray); // Set the radio state to this array
                        }}
                      />
                    );
                  })}
                </Form>
              </div>
              <div>
                <button
                  className="btn btn-danger mt-4"
                  onClick={() => window.location.reload()}
                >
                  Reset Filter
                </button>
              </div>
            </Col>
            {/* products section */}
            <Col className="mt-2 text-center" sm={9}>
              {/* {JSON.stringify(radio, null, 4)} */}
              <h1 className="text-center">Products</h1>
              {/* search product */}
              <Row className="justify-content-center mt-4">
                <Col sm={8} md={4} className="text-center">
                  <Form>
                    <Form.Control
                      type="text"
                      placeholder="Search by product name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={() => filterProduct()} className="mt-4">
                      Search
                    </Button>
                  </Form>
                </Col>
              </Row>
              <div className="d-flex flex-wrap m-4 gap-4">
                {productItems.slice(0, visbleProducts).map((elem) => (
                  <Card key={elem._id} style={{ width: "20rem" }}>
                    <Card.Img variant="top" src={elem.imageUrl} />

                    <Card.Body>
                      <Card.Title>{elem.name}</Card.Title>
                      <Card.Text>{elem.description}</Card.Text>
                      <Card.Text>₹ {elem.price}</Card.Text>
                      <div className="text-center">
                        <Button
                          onClick={() => navigate(`/product/${elem.slug}`)}
                          variant="primary"
                        >
                          Show Details
                        </Button>
                        <Button
                          className="ms-2"
                          variant="secondary"
                          onClick={() => {
                            setCart([...cart, elem]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, elem])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
              {visbleProducts < productItems.length && (
                <Button onClick={loadMoreProducts} variant="primary">
                  Show More
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
