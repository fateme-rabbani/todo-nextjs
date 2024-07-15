"use client";

import { createContext, useState, useCallback, useMemo } from "react";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const statuses = ["todo", "doing", "done"] as const;
export type Status = (typeof statuses)[number];
export interface Task {
  id: number;
  taskDes: string;
  status: Status;
}

export interface Board {
  id: number;
  des: string;
  tasks: Task[];
}

export interface BoardContext {
  boards: Board[];
  createTask: (taskDes: string, boardId: number) => void;
  createBoard: (des: string) => void;
  removeTask: (taskId: number, boardId: number) => void;
  changeStatus: (id: any, status: Status, boardId: number) => void;
  removeBoard: (id: number) => void;
  handleEditTaskTitle: (boardId: number, taskId: number, desc: string) => void;
  handleEditBoardTitle: (boardId: number, des: string) => void;
}

export const BoardContext = createContext<BoardContext>(null as never);

let _id = 0;
const makeId = () => ++_id;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [boards, setBoards] = useState<Board[]>([]);

  const createTask = useCallback<BoardContext["createTask"]>(
    (taskDes, boardId) => {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId
            ? {
                ...board,
                tasks: [
                  ...board.tasks,
                  { id: makeId(), taskDes, status: "todo" },
                ],
              }
            : board
        )
      );
    },
    []
  );

  const createBoard = useCallback((des: string) => {
    setBoards((prevBoards) => [
      ...prevBoards,
      { id: makeId(), des, tasks: [] },
    ]);
  }, []);

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
                tasks: board.tasks.map((task) =>
                  task.id !== id ? task : { ...task, status }
                ),
              }
        )
      );
    },
    []
  );

  const removeBoard = useCallback((id: number) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
  }, []);

  const handleEditTaskTitle = useCallback(
    (boardId: number, taskId: number, desc: string) => {
      const newDes = prompt("Edit task description:", desc);
      if (newDes !== null) {
        setBoards((prevBoard) =>
          prevBoard.map((board) =>
            board.id !== boardId
              ? board
              : {
                  ...board,
                  tasks: board.tasks.map((task) =>
                    task.id !== taskId ? task : { ...task, taskDes: newDes }
                  ),
                }
          )
        );
      }
    },
    []
  );

  const handleEditBoardTitle = useCallback((boardId: number, des: string) => {
    const newDes = prompt("Edit task description:", des);
    if (!newDes) return;
    setBoards((boards) =>
      boards.map((board) =>
        board.id !== boardId ? board : { ...board, des: newDes }
      )
    );
  }, []);

  return (
    <html lang="en">
      <BoardContext.Provider
        value={useMemo(
          () => ({
            boards,
            createTask,
            createBoard,
            removeTask,
            changeStatus,
            removeBoard,
            handleEditTaskTitle,
            handleEditBoardTitle,
          }),
          [
            boards,
            createTask,
            createBoard,
            removeTask,
            changeStatus,
            removeBoard,
            handleEditTaskTitle,
            handleEditBoardTitle,
          ]
        )}
      >
        <body className={inter.className}>{children}</body>
      </BoardContext.Provider>
    </html>
  );
}
