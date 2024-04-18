import React from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-4">
          <UserMenu />
        </div>
        <div className="col-md-8">{auth.user.name} profile</div>
      </div>
    </div>
  );
};

export default Profile;
