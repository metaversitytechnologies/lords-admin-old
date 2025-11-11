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
        <div className="outlet-container apl-section">
          <div className="apl-section">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
