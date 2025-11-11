import React from "react";

const NotFound: React.FC = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
