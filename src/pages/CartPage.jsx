import React, { useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { json, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <Container>
      <div className="row">
        <h1 className="mt-4 mb-2 text-center">Shopping Cart</h1>
        <div className="col-md-12 mb-2 text-center">
          {`Hello ${auth?.token && auth?.user.name}`}
        </div>
        <h4 className="text-center">
          {cart?.length >= 1
            ? `You have ${cart?.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your Cart Is Empty"}
        </h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cart?.map((elem) => {
            console.log(elem);
            return (
              <div key={elem._id} className="row p-4">
                <div className="col-md-4 text-center">
                  <Image
                    className="mt-4"
                    width={200}
                    src={`https://e-commerce-backend-gn5p.onrender.com/api/v1/product/product-photo/${elem._id}`}
                    alt="Product Image"
                    fluid
                  />
                </div>
                <div className="col-md-8">
                  <p>{elem.name}</p>
                  <p>{elem.description}</p>
                  <p>Price : ₹ {elem.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(elem._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>Cart Summary</h4>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total : ₹ {totalPrice()}</h4>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
