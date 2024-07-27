import { Box } from "@mui/material";

import { FC } from "react";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import TaskCard from "../TaskCard";
import TitleForm from "../TitleForm";
import Board from "@/models/Board";
import connectDB from "@/utils/connectDB";

export interface Task {
  _id: Types.ObjectId;
  taskDes: string;
}

export interface Column {
  _id: Types.ObjectId;
  name: string;
  tasks: Task[];
}

export interface Board {
  _id: Types.ObjectId;
  name: string;
  columns: Column[];
}

export interface TasksListProps {
  tasks: Task[];
  name: string;
  boardId: string;
  columnId: string;
  columns: Column[];
}

const TasksColumn: FC<TasksListProps> = ({
  columnId,
  name,
  tasks,
  boardId,
  columns,
}) => (
  <Box
    sx={{
      background: "#9090de",
      padding: 2,
      borderRadius: 1,
      minWidth: 250,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 2,
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        component="h1"
        sx={{
          color: "#fff",
          background: "#3b3bb1",
          padding: 2,
          borderRadius: 1,
        }}
      >
        {name}
      </Box>
      <TaskCard
        tasks={tasks}
        columnId={columnId}
        boardId={boardId}
        columns={columns}
      />
    </Box>

    <TitleForm
      handleSubmit={async (taskDes) => {
        "use server";
        await connectDB();

        await Board.updateOne(
          { "columns._id": columnId },
          {
            $push: {
              "columns.$.tasks": { _id: new Types.ObjectId(), taskDes },
            },
          }
        );

        revalidatePath(`/${boardId}`);
      }}
    />
  </Box>
);
export default TasksColumn;
