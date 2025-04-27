import React from "react";
import { ToastContainer } from "react-toastify";

function Toast() {
  return (
    <ToastContainer
      position="top-right"
      style={{ marginTop: "50px" }}
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export default Toast;
