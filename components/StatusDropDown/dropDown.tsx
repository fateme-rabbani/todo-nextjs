"use client";
import { Status } from "@/app/layout";
import { MenuItem, Select } from "@mui/material";
import { FC } from "react";

interface DropDownProps {
  taskStatus(value: string): void;
  status: Status;
}

export const DropDown: FC<DropDownProps> = ({ taskStatus, status }) => {
  return (
    <Select
      sx={{
        background: "#3b3bb1",
        color: "#fff",
        padding: 1,
        borderRadius: 1,
        height: 30,
        width: 120,
      }}
      value={status}
      onChange={async (e: any) => {
        const value = e.target.value;
        taskStatus(value);
      }}
    >
      <MenuItem value="todo">todo</MenuItem>
      <MenuItem value="doing">doing</MenuItem>
      <MenuItem value="done">done</MenuItem>
      <MenuItem value="remove">remove</MenuItem>
    </Select>
  );
};
