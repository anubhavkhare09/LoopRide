import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Slides() {
  return (
    <div>
      <ToastContainer />
      <img
        src="./assests/baner2.jpg"
        alt="Banner"
        style={{
          zIndex: "1",
          marginTop: "-5%",
          width: "100%",
          height: "auto", // Ensure the height adjusts based on the aspect ratio
          maxHeight: "100vh", // Prevent overflow on taller screens
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default Slides;
