import React from "react";
import UserMenu from "../../components/UserMenu";

const Orders = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-4">
          <UserMenu />
        </div>
        <div className="col-md-8">All Orders</div>
      </div>
    </div>
  );
};

export default Orders;
