import * as React from "react";
const PictureInPicture = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16 15.333a.667.667 0 0 0-.667.667v4c0 .368.299.667.667.667h5.333A.667.667 0 0 0 22 20v-4a.667.667 0 0 0-.667-.667H16Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.333 7.333c0-.368.299-.666.667-.666h20c.368 0 .667.298.667.666v17.334a.667.667 0 0 1-.667.666H6a.667.667 0 0 1-.667-.666V7.333ZM8 10c0-.368.298-.667.667-.667h14.666c.369 0 .667.299.667.667v12a.667.667 0 0 1-.667.667H8.667A.667.667 0 0 1 8 22V10Z"
      clipRule="evenodd"
    />
  </svg>
);
export default PictureInPicture;
