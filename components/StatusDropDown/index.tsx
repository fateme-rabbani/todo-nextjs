import { MenuItem, Select } from "@mui/material";
import { FC } from "react";

import useBoards, { Status } from "@/contexts/board";

interface Select {
  status: Status;
  id: number;
  boardId: string;
}

const StatusDropDown: FC<Select> = ({ status, id, boardId }) => {
  const { removeTask, changeStatus } = useBoards();

  const handleChange = (id: number, e: any) => {
    const value = e.target.value;

    if (value === "remove") removeTask(id, boardId);
    else changeStatus(id, value, boardId);
  };
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
      onChange={(e: any) => handleChange(id, e)}
    >
      <MenuItem value="todo">todo</MenuItem>
      <MenuItem value="doing">doing</MenuItem>
      <MenuItem value="done">done</MenuItem>
      <MenuItem value="remove">remove</MenuItem>
    </Select>
  );
};

export default StatusDropDown;
