import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { AwesomeButton } from "./Components";
import logo from "./emojis/index";
import "./App.css";

function App(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Go find or share a Doc!</p>
        <Space>
          <Button type="primary" onClick={() => navigate('/list')}>See Existing</Button>
          <AwesomeButton></AwesomeButton>
        </Space>
      </header>
    </div>
  );
}

export default App;
