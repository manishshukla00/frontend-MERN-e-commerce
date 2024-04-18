import React from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="text-center">
          <h1>Admin Panel</h1>
          <ListGroup>
            <NavLink className="p-4" to={"/dashboard/admin/create-category"}>
              Create Category
            </NavLink>
            <NavLink className="p-4" to={"/dashboard/admin/create-product"}>
              Create Product
            </NavLink>
            <NavLink className="p-4" to={"/dashboard/admin/products"}>
              Products
            </NavLink>
            <NavLink className="p-4" to={"/dashboard/admin/users"}>
              Users
            </NavLink>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default Adminmenu;
