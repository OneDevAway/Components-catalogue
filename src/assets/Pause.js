import React from "react";

function PauseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 36 36"
    >
      <path
        fill="white"
        d="M12.93 32H6.07A2.07 2.07 0 014 29.93V6.07A2.07 2.07 0 016.07 4h6.87A2.07 2.07 0 0115 6.07v23.86A2.07 2.07 0 0112.93 32M13 6H6v24h7z"
        className="clr-i-outline clr-i-outline-path-1"
      ></path>
      <path
        fill="white"
        d="M29.93 32h-6.86A2.07 2.07 0 0121 29.93V6.07A2.07 2.07 0 0123.07 4h6.87A2.07 2.07 0 0132 6.07v23.86A2.07 2.07 0 0129.93 32M30 6h-7v24h7z"
        className="clr-i-outline clr-i-outline-path-2"
      ></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  );
}

export default PauseIcon;