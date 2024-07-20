"use client";

import { FC } from "react";
import { Button } from "@mui/material";

export interface EditButtonProps {
  onRequestBoardEdit(des: string): void;
}

export const EditButton: FC<EditButtonProps> = ({ onRequestBoardEdit }) => (
  <Button
    sx={{
      color: "#fff",
      background: "#3b3bb1",
      padding: 10,
      textAlign: "center",
      fontSize: 12,
      border: "2px solid #3B3BB1",
      borderRadius: 10,
    }}
    onClick={async (e) => {
      e.stopPropagation();
      const newDes = prompt("new name:");
      if (!newDes) return;
      await onRequestBoardEdit(newDes);
      console.log("done");
    }}
  >
    edit
  </Button>
);
