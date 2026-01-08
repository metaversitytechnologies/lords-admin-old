import React from "react";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  const footerClass =
    location.pathname === "/login"
      ? "login-footer text-center p-t-10 p-b-10"
      : "footer text-center p-t-10 p-b-10";
  return (
    <footer className={footerClass}>
      <p className="m-b-0 upper-footer">
        <a className="footer-link" href="/responsiblegambling">
          Responsible Gambling
        </a>{" "}
        |{" "}
        <a href="#" className="footer-link" role="button">
          <b>Prohibited Territories</b>
        </a>{" "}
        |{" "}
        <a
          href="https://www.gamcare.org.uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline m-r-5">
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
          className="underline m-r-5 begambleaware">
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
          className="underline m-r-5">
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
        <a className="footer-link" href="javascript:void(0)">
          Rules &amp; Regulations
        </a>{" "}
        <span>© 2016-2020</span> Powered By{" "}
        <span>{window.location.hostname?.split(".")?.[1]}</span>
      </p>
    </footer>
  );
};

export default Footer;
