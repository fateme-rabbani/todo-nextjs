import { Box } from "@mui/material";

import { FC } from "react";
import { revalidatePath } from "next/cache";

import connectDB from "@/utils/connectDB";
import { TasksListProps } from "@/app/[boardId]/page";
import Board from "@/models/Board";
import StatusDropDown from "../StatusDropDown";
import { Title } from "./taskTitle";

export const TaskCard: FC<TasksListProps> = ({ tasks, status, boardId }) => {
  return tasks
    ?.filter((task) => task.status === status)
    .map((task, i) => {
      async function taskEdit(newDes: string) {
        "use server";
        await connectDB();

        await Board.updateOne(
          { "tasks._id": task.id },
          { $set: { "tasks.$.taskDes": newDes } }
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
          <Title des={task.taskDes} taskEdit={taskEdit} />
          <StatusDropDown status={task.status} id={task.id} boardId={boardId} />
        </Box>
      );
    });
};
export default TaskCard;
