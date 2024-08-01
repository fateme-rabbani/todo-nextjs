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
  <div className="flex justify-between flex-col gap-10 bg-violet-400 p-7 rounded-md">
    <div className="flex flex-col gap-5">
      <h1 className="text-xl p-4 bg-violet-900 text-slate-50 rounded-md">
        {name}
      </h1>
      <TaskCard
        tasks={tasks}
        columnId={columnId}
        boardId={boardId}
        columns={columns}
      />
    </div>

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
  </div>
);
export default TasksColumn;
