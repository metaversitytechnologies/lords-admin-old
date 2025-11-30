import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Balance from "../components/Balance";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`content ${isCollapsed ? "collapsed-menu" : ""}`}>
      <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
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
