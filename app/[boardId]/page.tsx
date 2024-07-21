import { Box } from "@mui/material";

import { FC } from "react";
import { revalidatePath } from "next/cache";

import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";
import { Status, statuses } from "../layout";
import TitleForm from "../../components/TitleForm";
import TasksColumn from "../../components/TasksColumn";

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
  params: { boardId: string };
};

const BoardPage: FC<ParamsType> = async (props) => {
  const { boardId } = props.params;
  await connectDB();
  const boards = await Board.find();

  const board = boards.find((board) => board._id.toString() === boardId);

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
      <TitleForm
        handleSubmit={async (taskDes) => {
          "use server";
          await connectDB();

          const board = await Board.findOne({ _id: boardId });

          board.tasks.push({ taskDes, status: "todo" });
          board.save();

          revalidatePath(`/${boardId}`);
        }}
      />
      {statuses.map((status) => (
        <TasksColumn
          key={status}
          status={status}
          tasks={board.tasks}
          boardId={boardId}
        />
      ))}
    </Box>
  );
};
export default BoardPage;
