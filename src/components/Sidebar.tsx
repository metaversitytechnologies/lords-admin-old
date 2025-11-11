import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Account Management");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menus = [
    {
      title: "Agency Management",
      links: [
        { text: "Agent Listing", href: "/agentlisting" },
        { text: "Transfer", href: "/bank" },
        { text: "Notiication", href: "/notification" }
      ]
    },
    {
      title: "Risk Management",
      links: [
        { text: "Net Exposure", href: "/netexpouser" },
        { text: "Bet Ticker", href: "/bettiker" }
      ]
    },
    {
      title: "Reports",
      links: [
        { text: "My Bets Report", href: "/mybets" },
        { text: "Profit Loss Report", href: "/profitLoss" },
        { text: "Transfer Statement", href: "/transferstmt" },
        { text: "Casino Result", href: "/casinoresult" },
        { text: "Game Report", href: "/gamereports" },
        { text: "Message Report", href: "/fraudreport" }
      ]
    },
    {
      title: "Account Management",
      links: [
        { text: "Account Statement", href: "/account-statement" },
        {
          text: "Clients Account Statement",
          href: "/accountstmt"
        },
        {
          text: "Balance",
          href: "/dashboardhome"
        }
      ]
    },
    {
      title: "Admin Users",
      links: [{ text: "Create Account", href: "/createaccount" }]
    },
    { title: "Live Casino", links: [], extraClass: "blinking-new" }
  ];

  const toggleMenu = (title: string, hasLinks: boolean) => {
    setActiveMenu((prev) => (prev === title && hasLinks ? "" : title));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="left-pane-wrapper">
      <div className={`left-pane ${isCollapsed ? "collapsed" : ""}`}>
        <nav className="menu">
          <ul className="list-unstyled m-0">
            {menus.map((menu) => {
              const isActive = activeMenu === menu.title;
              const rootClass = `rootMenu ${isActive ? "active" : "deactive"}`;

              return (
                <li
                  key={menu.title}
                  className={menu.title === "Admin Users" ? "" : rootClass}
                >
                  {/* Top-level menu title is a Link to the first child if available.
                      If no child exists, the Link stays on the current path (no navigation).
                      We still toggle the submenu on click. */}
                  <Link
                    to="#"
                    className={menu.extraClass || "menu-title"}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleMenu(menu.title, menu.links.length > 0);
                    }}
                    aria-expanded={activeMenu === menu.title}
                    aria-controls={`submenu-${menu.title}`}
                  >
                    {menu.title}
                  </Link>

                  {menu.links.length > 0 && isActive && (
                    <ul
                      className="list-unstyled ms-3"
                      id={`submenu-${menu.title}`}
                    >
                      {menu.links.map((link) => (
                        <li key={link.href} className="nav-item">
                          <Link to={link.href} className="nav-link">
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          className="collapsible-panel"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <div className="collapsible-panel-arrow">
            {isCollapsed ? "»" : "«"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
