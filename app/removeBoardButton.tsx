"use client";

import { Button } from "@mui/material";

import { FC } from "react";

export interface RemoveButtonProps {
  onRequestBoardRemove(): void;
}

export const RemoveButton: FC<RemoveButtonProps> = ({
  onRequestBoardRemove,
}) => (
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

      await onRequestBoardRemove();
    }}
  >
    delete
  </Button>
);
