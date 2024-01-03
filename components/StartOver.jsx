import React from "react";
import Button from "@mui/material/Button";

const StartOver = () => {
  return (
    <div className="startOver">
      <Button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default StartOver;
