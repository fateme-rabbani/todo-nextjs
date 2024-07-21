"use client";
import { Box } from "@mui/material";

import { FC } from "react";

interface TitleProps {
  des: string;
  taskEdit(des: string): void;
}

export const Title: FC<TitleProps> = ({ des, taskEdit }) => {
  return (
    <Box
      component="h3"
      sx={{ color: "#fff" }}
      onClick={async () => {
        const newDes = prompt("new name:");
        if (!newDes) return;
        await taskEdit(newDes);
      }}
    >
      {des}
    </Box>
  );
};
