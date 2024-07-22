import { Box } from "@mui/material";

import { FC } from "react";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";
import { Column, Task } from "../layout";
import TitleForm from "../../components/TitleForm";
import TasksColumn from "../../components/TasksColumn";
export interface TasksListProps {
  tasks: Task[];
  name: string;
  boardId: string;
  columnId: string;
  columns: Column[];
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
      <Box>
        <Box component="h1" sx={{ color: "#3b3bb1" }}>
          board
        </Box>
        <TitleForm
          handleSubmit={async (name) => {
            "use server";
            await connectDB();

            const board = await Board.findOne({ _id: boardId });
            if (!board) return;

            board.columns.push({ _id: new Types.ObjectId(), name, tasks: [] });
            board.save();

            revalidatePath(`/${boardId}`);
          }}
        />
      </Box>

      {board.columns.map((col) => (
        <TasksColumn
          key={col._id.toString()}
          columnId={col._id.toString()}
          name={col.name || ""}
          tasks={col.tasks as Task[]}
          boardId={boardId}
          columns={board.columns as Column[]}
        />
      ))}
    </Box>
  );
};
export default BoardPage;
