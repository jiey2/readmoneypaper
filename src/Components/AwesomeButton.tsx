import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@arco-design/web-react";
import ArcoConfetti from "arco-confetti";

export default function AwesomeButton() {
  const navigate = useNavigate();

  return (
    <div>
      <ArcoConfetti>
        <Button
          onClick={() => {
            navigate("/upload");
          }}
        >
          Upload
        </Button>
      </ArcoConfetti>
    </div>
  );
}
