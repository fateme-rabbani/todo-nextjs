import { FC } from "react";
import { revalidatePath } from "next/cache";

import connectDB from "@/utils/connectDB";
import { Status } from "@/app/layout";
import Board from "@/models/Board";
import { DropDown } from "./dropDown";

interface Select {
  status: Status;
  id: number;
  boardId: string;
}

const StatusDropDown: FC<Select> = ({ status, id, boardId }) => {
  async function taskStatus(value: string) {
    "use server";
    await connectDB();

    if (value === "remove") {
      await Board.updateOne(
        { _id: boardId },
        { $pull: { tasks: { _id: id } } }
      );
      revalidatePath(`/${boardId}`);
    } else {
      await Board.updateOne(
        { "tasks._id": id },
        { $set: { "tasks.$.status": value } }
      );
      revalidatePath(`/${boardId}`);
    }
  }
  return <DropDown taskStatus={taskStatus} status={status} />;
};

export default StatusDropDown;
