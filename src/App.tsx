import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space, Typography } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { AwesomeButton } from "./Components";
import logo from "./emojis/index";
import "./App.css";

function App(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <Typography>
          <Typography.Title heading={2} style={{ marginTop: 0 }}>
            三思社 Wiki
          </Typography.Title>
        </Typography>
        <img src={logo} className="App-logo" alt="logo" />
        <Typography>
          <Typography.Title heading={3} style={{ marginTop: 0 }}>
            Go find or share a Doc!
          </Typography.Title>
        </Typography>
        <Space>
          <Button type="primary" onClick={() => navigate("/list")}>
            See Existing
          </Button>
          <AwesomeButton></AwesomeButton>
        </Space>
      </header>
    </div>
  );
}

export default App;
