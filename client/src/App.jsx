import React from "react";
import Home from "./component/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer />
    <Home />
    </>
  );
}

export default App;
