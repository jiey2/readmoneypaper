import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotFoundPage from "./404";
import reportWebVitals from "./reportWebVitals";
import { UploadDocument, DocumentsList } from "./Pages";

document.body.setAttribute("arco-theme", "dark");

ReactDOM.render(
  // <React.StrictMode>
  //     <App />
  // </React.StrictMode>,
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/upload" element={<UploadDocument />} />
      <Route path="/list" element={<DocumentsList />} />
      <Route path="*" element={<NotFoundPage />} />
      {/* <Route path="invoices" element={<Invoices />} /> */}
    </Routes>
  </HashRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
