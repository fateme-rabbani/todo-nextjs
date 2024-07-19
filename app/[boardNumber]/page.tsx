"use client";

import { FC } from "react";

import TitleForm from "../../components/TitleForm";
import TasksColumn from "../../components/TasksColumn";
import { Box } from "@mui/material";
import useBoards, { Status, statuses } from "@/contexts/board";

export interface Task {
  id: number;
  taskDes: string;
  status: Status;
}

export interface TasksListProps {
  tasks: Task[];
  status: Status;
  boardId: string;
}

type ParamsType = {
  params: { boardNumber: string };
};

const Board: FC<ParamsType> = (props) => {
  const { boardNumber } = props.params;

  const { boards, createTask } = useBoards();

  const board = boards.find((board) => board._id === boardNumber);

  if (!board) return <h1>Board not found!</h1>;

  return (
    <Box
      sx={{
        background: "#ccc",
        height: "100dvh",
        width: "100%",
        display: "flex",
        gap: 2,
        padding: 2,
      }}
    >
      <Box component="h1" sx={{ color: "#3b3bb1" }}>
        board
      </Box>
      <TitleForm handleSubmit={(value) => createTask(value, boardNumber)} />
      {statuses.map((status) => (
        <TasksColumn
          key={status}
          status={status}
          tasks={board.tasks}
          boardId={boardNumber}
        />
      ))}
    </Box>
  );
};
export default Board;
