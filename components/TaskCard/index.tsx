import { Box } from "@mui/material";

import { FC } from "react";
import { revalidatePath } from "next/cache";

import connectDB from "@/utils/connectDB";

import Board from "@/models/Board";
import StatusDropDown from "../StatusDropDown";
import { Title } from "./taskTitle";
import { Column, Task } from "@/app/layout";

export interface TaskCardProps {
  tasks: Task[];
  boardId: string;
  columnId: string;
  columns: Column[];
}

export const TaskCard: FC<TaskCardProps> = ({
  tasks,
  columnId,
  boardId,
  columns,
}) => {
  return tasks.map((task, i) => {
    async function taskEdit(newDes: string) {
      "use server";
      await connectDB();
      await Board.updateOne(
        { "columns._id": columnId, "columns.tasks._id": task._id },
        {
          $set: {
            "columns.$[col].tasks.$[task].taskDes": newDes,
          },
        },
        {
          arrayFilters: [{ "col._id": columnId }, { "task._id": task._id }],
        }
      );
      revalidatePath(`/${boardId}`);
    }
    return (
      <Box
        sx={{
          background: "#5f5fc2",
          padding: 1,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        key={i}
      >
        <Title des={task.taskDes || ""} taskEdit={taskEdit} />
        <StatusDropDown
          columnId={columnId}
          id={task._id.toString()}
          boardId={boardId}
          columns={columns}
          taskDes={task.taskDes || ""}
        />
      </Box>
    );
  });
};
export default TaskCard;
