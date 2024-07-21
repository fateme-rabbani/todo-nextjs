"use client";

import { Button } from "@mui/material";

import { FC } from "react";

export interface EditButtonProps {
  onRequestBoardEdit(des: string): void;
}

export const EditButton: FC<EditButtonProps> = ({ onRequestBoardEdit }) => (
  <Button
    sx={{
      color: "#fff",
      background: "#3b3bb1",
      padding: 1,
      textAlign: "center",
      fontSize: 12,
      border: "2px solid #3B3BB1",
      borderRadius: 2,
    }}
    onClick={async (e) => {
      e.stopPropagation();
      const newDes = prompt("new name:");
      if (!newDes) return;
      await onRequestBoardEdit(newDes);
    }}
  >
    edit
  </Button>
);
