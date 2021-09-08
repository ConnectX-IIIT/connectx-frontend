import React, { useState } from "react";
import "../../styles/Admin/AdminPannelButton.css";

function AdminPannelButton({ innerContent, buttonColor, paddingX, isBorder }) {
  const [buttonHover, setButtonHover] = useState(false);
  return (
    <button
      onMouseOver={() => {
        setButtonHover(!buttonHover);
      }}
      onMouseLeave={() => {
        setButtonHover(!buttonHover);
      }}
      style={{
        color: isBorder ? (buttonHover ? "white" : buttonColor) : buttonColor,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        border: isBorder ? "1px solid" : "none",
        borderColor: buttonColor,
        backgroundColor: isBorder
          ? buttonHover
            ? buttonColor
            : "transparent"
          : "transparent",
      }}
      className="admin-pannel-bottom-button"
    >
      {innerContent}
    </button>
  );
}

export default AdminPannelButton;
