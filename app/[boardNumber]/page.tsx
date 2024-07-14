"use client";
import styled from "styled-components";
import { useContext } from "react";

import Input from "../../components/Input";
import Column from "../../components/Column";
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

type ParamsType = {
  params: { boardNumber: string };
};

const Board = (props: ParamsType) => {
  const { boards, createTask } = useContext(BoardContext);

  const board = boards.filter(
    (board) => board.id === +props.params.boardNumber
  )[0];

  return (
    <Wrapper>
      <Title>board {props.params.boardNumber}</Title>
      <Input
        handleSubmit={(value) => createTask(value, +props.params.boardNumber)}
      />
      {statuses.map((status, i) => (
        <Column
          status={status}
          key={i}
          tasks={board?.tasks}
          boardId={+props.params.boardNumber}
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
