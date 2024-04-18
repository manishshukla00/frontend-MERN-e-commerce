import React from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="text-center">
          <h1>Dashboard</h1>
          <ListGroup>
            <NavLink className="p-4" to={"/dashboard/user/profile"}>
              Profile
            </NavLink>
            <NavLink className="p-4" to={"/dashboard/user/orders"}>
              Orders
            </NavLink>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
