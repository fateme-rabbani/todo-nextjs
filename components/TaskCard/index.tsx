import { FC } from "react";
import { revalidatePath } from "next/cache";

import connectDB from "@/utils/connectDB";

import Board from "@/models/Board";
import StatusDropDown from "../StatusDropDown";
import { Title } from "./taskTitle";
import { Column, Task } from "../TasksColumn";

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
      <div className="flex flex-col gap-2 bg-violet-600 p-3 rounded-md" key={i}>
        <Title des={task.taskDes || ""} taskEdit={taskEdit} />
        <StatusDropDown
          columnId={columnId}
          id={task._id.toString()}
          boardId={boardId}
          columns={columns}
          taskDes={task.taskDes || ""}
        />
      </div>
    );
  });
};
export default TaskCard;
