import React from "react";
import Adminmenu from "../../components/Adminmenu";

const Users = () => {
  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-4">
          <Adminmenu />
        </div>
        <div className="col-md-8">
          <div className="w-75">
            <h4>Users</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
