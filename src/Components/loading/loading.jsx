import React from "react";
import "./loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="particles">
        {/* Background particles */}
        <div className="particle" style={{ top: "10%", left: "20%" }}></div>
        <div className="particle" style={{ top: "50%", left: "70%" }}></div>
        <div className="particle" style={{ top: "80%", left: "30%" }}></div>
        <div className="particle" style={{ top: "40%", left: "50%" }}></div>
      </div>
      <div className="animated-logo">
        <div className="orbit"></div>
        <div className="core"></div>
      </div>
      <h1 className="animated-text">
        <span className="nova">NOVA</span>
        <span className="tagline">Connecting businesses</span>
      </h1>
    </div>
  );
}

export default Loading;
