"use client";

import { FC, createContext, ReactNode, useContext } from "react";

export const statuses = ["todo", "doing", "done"] as const;
export type Status = (typeof statuses)[number];
export interface Task {
  id: number;
  taskDes: string;
  status: Status;
}

export interface Board {
  _id: string;
  des: string;
  tasks: Task[];
}

export interface BoardContext {
  boards: Board[];
  createTask: (taskDes: string, boardId: string) => void;
  createBoard: (des: string) => void;
  removeTask: (taskId: number, boardId: string) => void;
  changeStatus: (id: any, status: Status, boardId: string) => void;
  removeBoard: (id: string) => void;
  handleEditTaskTitle: (boardId: string, taskId: number, desc: string) => void;
  handleEditBoardTitle: (boardId: string, des: string) => void;
}

export const BoardContext = createContext<BoardContext>(null as never);

export interface BoardProviderProps {
  boards: Board[];
  children: ReactNode;
}

export const BoardProvider: FC<BoardProviderProps> = ({ boards, children }) => {
  console.log("lwekjf");

  // const createTask = useCallback<BoardContext["createTask"]>(
  //   async (taskDes, boardId) => {
  // setBoards((prevBoards) =>
  //   prevBoards.map((board) =>
  //     board._id === boardId
  //       ? {
  //           ...board,
  //           tasks: [
  //             ...board.tasks,
  //             { id: makeId(), taskDes, status: "todo" },
  //           ],
  //         }
  //       : board
  //     //   )
  //     // );
  //     const res = await fetch("/api/task", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         _id: boardId,
  //         tasks: { taskDes, status: "todo" },
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const data = await res.json();

  //     if (!data.error) {
  //     }
  //   },
  //   []
  // );

  // const createBoard = useCallback<BoardContext["createBoard"]>(async (des) => {
  //   // setBoards((prevBoards) => [
  //   //   ...prevBoards,
  //   //   { id: makeId(), des, tasks: [] },
  //   // ]);
  //   const res = await fetch("/api", {
  //     method: "POST",
  //     body: JSON.stringify({ des, tasks: [] }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const data = await res.json();

  //   if (!data.error) {
  //   }
  // }, []);

  // const removeTask = useCallback<BoardContext["removeTask"]>(
  //   async (taskId, boardId) => {
  //     // setBoards((prevBoard) =>
  //     //   prevBoard.map((board) =>
  //     //     board._id === boardId
  //     //       ? {
  //     //           ...board,
  //     //           tasks: board.tasks.filter((task) => task.id !== taskId),
  //     //         }
  //     //       : board
  //     //   )
  //     // );
  //     const res = await fetch(`/api/deleteTask/${taskId}`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const result = await res.json();

  //     if (!result.error) {
  //     }
  //   },
  //   []
  // );

  // const changeStatus = useCallback<BoardContext["changeStatus"]>(
  //   async (id, status, boardId) => {
  //     // setBoards((prevBoard) =>
  //     //   prevBoard.map((board) =>
  //     //     board._id !== boardId
  //     //       ? board
  //     //       : {
  //     //           ...board,
  //     //           tasks: board.tasks.map((task) =>
  //     //             task.id !== id ? task : { ...task, status }
  //     //           ),
  //     //         }
  //     //   )
  //     // );
  //     const res = await fetch("/api/task", {
  //       method: "PATCH",
  //       body: JSON.stringify({ _id: id, tasks: { status } }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const data = await res.json();

  //     if (!data.error) {
  //     }
  //   },
  //   []
  // );

  // const removeBoard = useCallback<BoardContext["removeBoard"]>(async (id) => {
  //   // setBoards((prevBoards) => prevBoards.filter((board) => board._id !== id));

  //   const res = await fetch(`/api/deleteBoard/${id}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const result = await res.json();

  //   if (!result.error) {
  //   }
  // }, []);

  // const handleEditTaskTitle = useCallback<BoardContext["handleEditTaskTitle"]>(
  //   async (boardId, taskId, desc) => {
  //     const newDes = prompt("Edit task description:", desc);
  //     if (newDes !== null) {
  //       //   setBoards((prevBoard) =>
  //       //     prevBoard.map((board) =>
  //       //       board._id !== boardId
  //       //         ? board
  //       //         : {
  //       //             ...board,
  //       //             tasks: board.tasks.map((task) =>
  //       //               task.id !== taskId ? task : { ...task, taskDes: newDes }
  //       //             ),
  //       //           }
  //       //     )
  //       //   );

  //       const res = await fetch("/api/task", {
  //         method: "PATCH",
  //         body: JSON.stringify({ _id: taskId, tasks: { tsakDes: newDes } }),
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       const data = await res.json();

  //       if (!data.error) {
  //       }
  //     }
  //   },
  //   []
  // );

  // const handleEditBoardTitle = useCallback<
  //   BoardContext["handleEditBoardTitle"]
  // >(async (boardId, des) => {
  //   const newDes = prompt("Edit task description:", des);
  //   if (!newDes) return;
  //   // setBoards((boards) =>
  //   //   boards.map((board) =>
  //   //     board._id !== boardId ? board : { ...board, des: newDes }
  //   //   )
  //   // );
  //   const res = await fetch("/api", {
  //     method: "PATCH",
  //     body: JSON.stringify({ _id: boardId, des: newDes }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const data = await res.json();

  //   if (!data.error) {
  //   }
  // }, []);

  return (
    <BoardContext.Provider
      // FIXME:
      // @ts-expect-error
      value={{
        boards: [],
        // createTask,
        // createBoard,
        // removeTask,
        // changeStatus,
        // removeBoard,
        // handleEditTaskTitle,
        // handleEditBoardTitle,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default function useBoards() {
  return useContext(BoardContext);
}
