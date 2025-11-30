import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ChangePasswordSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const auth = useAuth();
  const location = useLocation();
  const logoutType = location.state?.logoutType;
  const domain = globalThis.location.hostname.replace(/^www\./, "");

  useEffect(() => {
    if (logoutType === "soft") {
      auth.softLogout();
    } else if (logoutType === "full") {
      auth.logout();
    }
  }, [auth, logoutType]);

  return (
    <div className="cp-success-box">
      <div className="text-center container">
        <h1>
          <span className="text-success">
            Success! Your password has been updated successfully.
          </span>
        </h1>
        <h1>
          Your transaction password is{" "}
          <span className="text-info token-box">{id}</span>.
        </h1>
        <h2>
          Please remember this transaction password, from now on all transcation
          of the website can be done only with this password and keep one thing
          in mind, do not share this password with anyone.
        </h2>
        <h2 className="mt-3">Thank you, Team {domain}</h2>
        <div className="font-hindi">
          <h1 className="mt-5">
            <span className="text-success">
              Success! आपका पासवर्ड बदला जा चुका है।
            </span>
          </h1>
          <h1>
            आपका लेनदेन पासवर्ड{" "}
            <span className="text-info token-box">{id}</span> है।
          </h1>
          <h2>
            कृपया इस लेन-देन के पासवर्ड को याद रखें, अब से वेबसाइट के सभी
            हस्तांतरण केवल इस पासवर्ड से किए जा सकते हैं और एक बात का ध्यान
            रखें, इस पासवर्ड को किसी के साथ साझा न करें।
          </h2>
          <h2 className="mt-3">धन्यवाद, टीम {domain}</h2>
        </div>
        <Link
          to="/login"
          className="btn btn-dark btn-lg mt-5"
          style={{ minWidth: 200 }}
        >
          <i className="fas fa-arrow-left mr-3"></i>Back
        </Link>
      </div>
    </div>
  );
};

export default ChangePasswordSuccess;
