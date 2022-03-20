import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from "@arco-design/web-react";
import "./App.css";

export default function NotFoundPage(): ReactElement {
  const navigate = useNavigate();
  return (
    <div className="App-header">
      <Result status="404" subTitle="Whoops, that page is gone. " />
      <Button onClick={() => navigate('/')}>
        Home
      </Button>
    </div>
  );
}
