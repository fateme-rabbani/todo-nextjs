"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const statuses = ["todo", "doing", "done"] as const;
export type Status = (typeof statuses)[number];
export interface Task {
  id: number;
  taskDes: string;
  status: Status;
}
interface Board {
  id: number;
  des: string;
  tasks: Task[];
}
interface BoardContextType {
  boards: Board[];
  createTask: (value: string, id: number) => void;
  createBoard: (value: string) => void;
  removeTask: (taskId: number, boardId: number) => void;
  changeStatus: (id: any, status: Status, boardId: number) => void;
  removeBoard: (id: number) => void;
}

export const BoardContext = createContext<BoardContextType>(null as never);

let _id = 0;
const makeId = () => ++_id;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [boards, setBoards] = useState<Board[]>([]);

  const createTask = (value: string, id: number) => {
    setBoards((prevBoard) =>
      prevBoard.map((board) =>
        board.id === id
          ? {
              ...board,
              tasks: [
                ...board.tasks,
                { id: makeId(), taskDes: value, status: "todo" },
              ],
            }
          : board
      )
    );
  };
  const createBoard = (value: string) => {
    setBoards([...boards, { id: makeId(), des: value, tasks: [] }]);
  };

  const removeTask = (taskId: number, boardId: number) => {
    setBoards((prevBoard) =>
      prevBoard.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.filter((task) => task.id !== taskId),
            }
          : board
      )
    );
  };

  const changeStatus = (id: any, status: Status, boardId: number) => {
    setBoards((prevBoard) =>
      prevBoard.map((board) =>
        board.id !== boardId
          ? board
          : {
              ...board,
              tasks: board.tasks.map((task) => {
                if (task.id !== id) return task;
                return { ...task, status };
              }),
            }
      )
    );
  };

  const removeBoard = (id: number) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  return (
    <html lang="en">
      <BoardContext.Provider
        value={{
          boards,
          createTask,
          createBoard,
          removeTask,
          changeStatus,
          removeBoard,
        }}
      >
        <body className={inter.className}>{children}</body>
      </BoardContext.Provider>
    </html>
  );
}
