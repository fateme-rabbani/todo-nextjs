"use client";
import { MenuItem, Select } from "@mui/material";

import { FC } from "react";

import { Column } from "@/app/layout";

interface DropDownProps {
  taskStatus(value: string): void;
  columnId: string;
  columns: Column[];
}

export const DropDown: FC<DropDownProps> = ({
  taskStatus,
  columnId,
  columns,
}) => {
  const value = columns.find((col) => col._id.toString() === columnId)?._id;

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
      value={value}
      onChange={async (e: any) => {
        const value = e.target.value;
        taskStatus(value);
      }}
    >
      {columns.map((col) => (
        <MenuItem key={col._id.toString()} value={col._id.toString()}>
          {col.name}
        </MenuItem>
      ))}
      <MenuItem value="remove">remove</MenuItem>
    </Select>
  );
};
