"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useState, useCallback, useMemo } from "react";

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

  const createTask = useCallback((value: string, id: number) => {
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
  }, []);

  const createBoard = useCallback(
    (value: string) => {
      setBoards([...boards, { id: makeId(), des: value, tasks: [] }]);
    },
    [boards]
  );

  const removeTask = useCallback((taskId: number, boardId: number) => {
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
  }, []);

  const changeStatus = useCallback(
    (id: any, status: Status, boardId: number) => {
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
    },
    []
  );

  const removeBoard = useCallback(
    (id: number) => {
      setBoards(boards.filter((board) => board.id !== id));
    },
    [boards]
  );

  const contextValue = useMemo(
    () => ({
      boards,
      createTask,
      createBoard,
      removeTask,
      changeStatus,
      removeBoard,
    }),
    [boards, createTask, createBoard, removeTask, changeStatus, removeBoard]
  );

  return (
    <html lang="en">
      <BoardContext.Provider value={contextValue}>
        <body className={inter.className}>{children}</body>
      </BoardContext.Provider>
    </html>
  );
}
