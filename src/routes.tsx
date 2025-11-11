import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import { ProtectedRoute } from "./context/AuthContext";
import AccountSection from "./components/AccountSection";
import AgentListing from "./components/AgentListing";
import DashboardLayout from "./layouts/DashboardLayout";
import BalanceInfo from "./components/BalanceInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "agentlisting", element: <AgentListing /> },
          { path: "createaccount", element: <AccountSection /> },
          { path: "dashboardhome", element: <BalanceInfo /> },
          { path: "account-statement", element: <div /> },
          { path: "accountstmt", element: <div /> },
          { path: "bank", element: <div /> },
          { path: "notification", element: <div /> },
          { path: "netexpouser", element: <div /> },
          { path: "bettiker", element: <div /> },
          { path: "mybets", element: <div /> },
          { path: "profitLoss", element: <div /> },
          { path: "transferstmt", element: <div /> },
          { path: "casinoresult", element: <div /> },
          { path: "gamereports", element: <div /> },
          { path: "fraudreport", element: <div /> }
        ]
      }
    ]
  }
]);
