"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ title, subtitle, open, onOpenChange }) {
  useEffect(() => {
    let modalCheck = localStorage.getItem("initialModal");
    if (modalCheck === "closed") {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  const handleClose = () => {
    onOpenChange(false);
    localStorage.setItem("initialModal", "closed");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ fontWeight: "500" }}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {subtitle}
          </Typography>
          <div className="modalIcon">
            <IconButton onClick={handleClose} aria-label="clear">
              <ClearIcon />
            </IconButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
