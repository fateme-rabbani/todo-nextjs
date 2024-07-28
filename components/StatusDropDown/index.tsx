import { FC } from "react";
import { revalidatePath } from "next/cache";

import connectDB from "@/utils/connectDB";
import { Column } from "@/app/layout";
import Board from "@/models/Board";
import { DropDown } from "./dropDown";

interface Select {
  columnId: string;
  id: string;
  boardId: string;
  columns: Column[];
  taskDes: string;
}

const StatusDropDown: FC<Select> = ({
  columnId,
  id,
  boardId,
  columns,
  taskDes,
}) => {
  async function taskStatus(value: string) {
    "use server";
    await connectDB();
    if (value !== "remove") {
      //add task to new column
      await Board.updateOne(
        { _id: boardId, "columns._id": value },
        { $push: { "columns.$.tasks": { _id: id, taskDes } } }
      );
    }
    // remove task
    await Board.updateOne(
      { _id: boardId, "columns._id": columnId },
      { $pull: { "columns.$.tasks": { _id: id } } }
    );
    revalidatePath(`/${boardId}`);
  }
  return (
    <DropDown taskStatus={taskStatus} columnId={columnId} columns={columns} />
  );
};

export default StatusDropDown;
