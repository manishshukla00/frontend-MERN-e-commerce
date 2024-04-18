import React from "react";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div className="pnf text-center">
      <h1 className="pnf-title">404</h1>
      <h1 className="pnf-heading">Page Not Found</h1>
      <Link to={"/"} className="pnf-btn">
        Go Back
      </Link>
    </div>
  );
};

export default Pagenotfound;
