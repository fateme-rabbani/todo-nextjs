"use client";

import { FC, useContext } from "react";
import styled from "styled-components";
import z from "zod";

import TitleForm from "../../components/TitleForm";
import TasksColumn from "../../components/TasksColumn";
import { BoardContext, Status, statuses } from "../layout";

export interface Task {
  id: number;
  taskDes: string;
  status: Status;
}

export interface TasksListProps {
  tasks: Task[];
  status: Status;
  boardId: number;
}

const paramsSchema = z.object({
  boardNumber: z.coerce.number(),
});

const Board: FC<NextPageProps> = ({ params }) => {
  const { boardNumber } = paramsSchema.parse(params);

  const { boards, createTask } = useContext(BoardContext);

  const board = boards.find((board) => board.id === boardNumber);

  if (!board) return <h1>Board not found!</h1>;

  return (
    <Wrapper>
      <Title>board {boardNumber}</Title>
      <TitleForm handleSubmit={(value) => createTask(value, boardNumber)} />
      {statuses.map((status) => (
        <TasksColumn
          key={status}
          status={status}
          tasks={board.tasks}
          boardId={boardNumber}
        />
      ))}
    </Wrapper>
  );
};
export default Board;

const Wrapper = styled.div`
  background-color: #ccc;
  height: 100%;
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const Title = styled.h1`
  color: #3b3bb1;
`;
