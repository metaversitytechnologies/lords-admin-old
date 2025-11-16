import React from "react";
import { useAuth } from "../context/AuthContext";

const Footer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer
      className={`${
        isAuthenticated ? "footer" : "login-footer"
      } footer-color customfooter`}
    >
      <p className="m-b-0 upper-footer">
        <a href="/responsiblegambling" className="theme1font">
          Responsible Gambling
        </a>{" "}
        |{" "}
        <a href="#" className="theme1font" role="button">
          <b>Prohibited Territories</b>
        </a>{" "}
        |{" "}
        <a
          href="https://www.gamcare.org.uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline m-r-5"
        >
          <img
            src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/gamecare.svg"
            className="game-care"
            alt="GamCare"
          />
        </a>{" "}
        |{" "}
        <a
          href="https://www.begambleaware.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline m-r-5 begambleaware"
        >
          <img
            src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/gambleaware.png"
            className="game-aware"
            alt="BeGambleAware"
          />
        </a>{" "}
        |{" "}
        <a
          href="https://www.gamstop.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline m-r-5"
        >
          <img
            src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/gamestop.svg"
            className="game-stop"
            alt="GamStop"
          />
        </a>{" "}
        |{" "}
        <a href="javascript:void(0)" className="underline m-r-5" role="button">
          <img
            src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/18plus.png"
            className="footer-log game-plus"
            alt="18+"
          />
        </a>
      </p>

      <p className="m-b-0 lower-footer bottom-footer">
        <a href="javascript:void(0)">Rules &amp; Regulations</a>{" "}
        <span>© 2016-2020</span> Powered By
      </p>
    </footer>
  );
};

export default Footer;
