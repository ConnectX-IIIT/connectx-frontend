import React from "react";
import "../../styles/Landing/Button.css";
import { Link } from "react-router-dom";

function Button() {
  return (
    <div>
       <Link to="/signup">
      <button className="Join_us_button">Join Us -{`>`} </button>
      </Link>
    </div>
  );
}

export default Button;
