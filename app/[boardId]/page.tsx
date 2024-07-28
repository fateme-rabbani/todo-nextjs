import { FC } from "react";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
import z from "zod";

import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";
import TitleForm from "../../components/TitleForm";
import TasksColumn from "../../components/TasksColumn";
import { notFound } from "next/navigation";
import toPlainObj from "@/utils/toPlainObj";

export const paramsSchema = z.object({ boardId: z.string().length(24) });

const BoardPage: FC<NextPageProps> = async (props) => {
  const { boardId } = paramsSchema.parse(props.params);

  await connectDB();
  const board = toPlainObj(await Board.findOne({ _id: boardId }).lean());

  if (!board) notFound();

  return (
    <div className="flex gap-10 p-2">
      <div>
        <h1 className="text-[30px] font-bold">board</h1>
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
      </div>

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
    </div>
  );
};
export default BoardPage;
