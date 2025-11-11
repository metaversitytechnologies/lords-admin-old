import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import { ProtectedRoute } from "./context/AuthContext";
import AccountSection from "./components/AccountSection";
import AgentListing from "./components/AgentListing";
import DashboardLayout from "./layouts/DashboardLayout";
import BalanceInfo from "./components/BalanceInfo";
import Transfer from "./components/Transfer";
import Notification from "./components/Notification";
import NetExposure from "./components/Netexposure";
import BetTicker from "./components/BetTicker";
import BetList from "./components/BestList";
import TransferStatement from "./components/TransferStatement";
import ProfitLoss from "./components/ProfitLoss";

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
          { path: "bank", element: <Transfer /> },
          { path: "notification", element: <Notification /> },
          { path: "netexpouser", element: <NetExposure /> },
          { path: "bettiker", element: <BetTicker /> },
          { path: "mybets", element: <BetList /> },
          { path: "profitLoss", element: <ProfitLoss /> },
          { path: "transferstmt", element: <TransferStatement /> },
          { path: "casinoresult", element: <div /> },
          { path: "gamereports", element: <div /> },
          { path: "fraudreport", element: <div /> }
        ]
      }
    ]
  }
]);
