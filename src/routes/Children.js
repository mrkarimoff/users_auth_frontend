import React from "react";
import { Outlet } from "react-router-dom";

const Children = () => {
  return (
    <div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Children;
