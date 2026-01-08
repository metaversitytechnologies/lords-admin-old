import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Balance from "../components/Balance";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { pathname } = useLocation();

  console.log(pathname, "pathnamepathname");

  return (
    <div className={`content ${isCollapsed ? "collapsed-menu" : ""}`}>
      <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      <div className="mid-pane">
        <Balance />
        <div
          className={
            !pathname?.includes("live-casino") &&
            !pathname?.includes("crash-casino")
              ? "apl-section"
              : ""
          }>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
