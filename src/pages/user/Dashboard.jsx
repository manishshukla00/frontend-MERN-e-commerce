import React from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <div>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-4">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="w-75 p-4">
              <h4>{auth.user.name}</h4>
              <h4>{auth.user.email}</h4>
              <h4>{auth.user.address}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
