import { FC } from "react";
import { Box } from "@mui/material";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
import z from "zod";

import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";
import TitleForm from "../../components/TitleForm";
import TasksColumn from "../../components/TasksColumn";
import { notFound } from "next/navigation";

export const paramsSchema = z.object({ boardId: z.string().length(24) });

const BoardPage: FC<NextPageProps> = async (props) => {
  const { boardId } = paramsSchema.parse(props.params);

  await connectDB();
  const board = await Board.findOne({ _id: boardId });

  if (!board) notFound();

  return (
    <Box
      sx={{
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
          tasks={col.tasks}
          boardId={boardId}
          columns={board.columns}
        />
      ))}
    </Box>
  );
};
export default BoardPage;
