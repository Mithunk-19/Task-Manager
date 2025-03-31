import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
document.addEventListener("mousemove", (e) => {
  let cursor = document.querySelector(".cursor");
  if (!cursor) {
    cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);
  }
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});
