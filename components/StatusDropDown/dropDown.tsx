"use client";

import { FC } from "react";
import { Column } from "../TasksColumn";

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
  const value = columns
    .find((col) => col._id.toString() === columnId)
    ?._id.toString();
  return (
    <select
      className="bg-violet-800 text-slate-50 p-1 rounded"
      value={value}
      onChange={async (e: any) => {
        const value = e.target.value;
        taskStatus(value);
      }}
    >
      {columns.map((col) => (
        <option key={col._id.toString()} value={col._id.toString()}>
          {col.name}
        </option>
      ))}
      <option value="remove">remove</option>
    </select>
  );
};
