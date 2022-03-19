import React from "react";
import { Button, Space } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import logo from "./emojis/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Upload a Doc, get a link.</p>
        <Space>
          <Button type="primary">See Existing</Button>
          <Button >Upload</Button>
        </Space>
      </header>
    </div>
  );
}

export default App;
