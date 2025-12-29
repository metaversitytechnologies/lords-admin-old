import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import { ProtectedRoute } from "./context/AuthContext";
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
import MarketLayout from "./components/MarketLayout";
import CasinoReport from "./components/CasinoReport";
import GameReports from "./components/GameReports";
import MessageReport from "./components/MessageReport";
import AccountStatement from "./components/AccountStatement";
import ClientAccountStatement from "./components/ClientAccountStatement";
import NewAgent from "./components/NewAgent";
import CreateUserForm from "./components/CreateUserForm";
import DownlineReports from "./components/DownlineReports";
import ChangePasswordSuccess from "./components/ChangePasswordSuccess";
import ChangePassword from "./components/ChangePassword";
import SecureAuth from "./components/SecureAuth";
import LiveCasinoList from "./components/LiveCasinoList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "change-password-success/:id",
        element: <ChangePasswordSuccess />
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/netexpouser" replace />
          },
          { path: "agentlisting", element: <AgentListing /> },
          { path: "agentlisting/:userid", element: <AgentListing /> },
          { path: "createaccount", element: <CreateUserForm /> },
          { path: "dashboardhome", element: <BalanceInfo /> },
          { path: "account-statement", element: <AccountStatement /> },
          { path: "accountstmt", element: <ClientAccountStatement /> },
          { path: "bank", element: <Transfer /> },
          { path: "notification", element: <Notification /> },
          { path: "netexpouser", element: <NetExposure /> },
          { path: "gamedetailnew/:id", element: <MarketLayout /> },
          { path: "bettiker", element: <BetTicker /> },
          { path: "mybets", element: <BetList /> },
          { path: "profitLoss", element: <ProfitLoss /> },
          { path: "transferstmt", element: <TransferStatement /> },
          { path: "casinoresult", element: <CasinoReport /> },
          { path: "live-casino", element: <LiveCasinoList /> },
          { path: "gamereports", element: <GameReports /> },
          { path: "fraudreport", element: <MessageReport /> },
          { path: "createagent", element: <NewAgent /> },
          { path: "changepassword", element: <ChangePassword /> },
          { path: "secureauth", element: <SecureAuth /> },
          {
            path: "downlinereports/:id/",
            element: <DownlineReports />
          }
        ]
      }
    ]
  }
]);
