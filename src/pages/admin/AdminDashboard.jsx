import React from "react";
import Adminmenu from "../../components/Adminmenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-4">
          <Adminmenu />
        </div>
        <div className="col-md-8">
          <div className="w-75">
            <h4>Admin Name : {auth.user.name}</h4>
            <h4>Admin Email : {auth.user.email}</h4>
            <h4>Admin Contact : {auth.user.phone}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
