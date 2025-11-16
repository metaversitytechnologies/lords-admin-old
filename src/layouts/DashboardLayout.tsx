import React from "react";
import Sidebar from "../components/Sidebar";
import Balance from "../components/Balance";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="content">
      <Sidebar />
      <div className="mid-pane">
        <Balance />
        <div className=" apl-section">
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
