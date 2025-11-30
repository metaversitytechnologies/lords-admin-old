import { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar = ({ isCollapsed, toggleCollapse }: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState("Account Management");

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
        { text: "Clients Account Statement", href: "/accountstmt" },
        { text: "Balance", href: "/dashboardhome" }
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

  return (
    <div className="left-pane-wrapper">
      <div className="left-pane">
        {!isCollapsed && (
          <nav className="menu">
            <ul className="list-unstyled m-0">
              {menus.map((menu) => {
                const isActive = activeMenu === menu.title;
                const rootClass = `rootMenu ${
                  isActive ? "active" : "deactive"
                }`;

                return (
                  <li
                    key={menu.title}
                    className={menu.title === "Admin Users" ? "" : rootClass}
                  >
                    <Link
                      to="#"
                      className={menu.extraClass || "menu-title"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMenu(menu.title, menu.links.length > 0);
                      }}
                      aria-expanded={activeMenu === menu.title}
                    >
                      {menu.title}
                    </Link>

                    {menu.links.length > 0 && isActive && (
                      <ul className="list-unstyled ms-3">
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
        )}

        {/* ------------------ TOGGLE BUTTON (ALWAYS VISIBLE) ------------------ */}
        <div
          className="collapsible-panel"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <div className="collapsible-panel-arrow">
            {isCollapsed ? "»" : "«"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
