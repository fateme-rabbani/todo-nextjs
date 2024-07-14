import styled from "styled-components";
import { FC } from "react";

import { TasksListProps } from "@/app/[boardNumber]/page";
import Card from "../Card";

interface ColumnProps extends TasksListProps {}

const Column: FC<ColumnProps> = ({ status, tasks, boardId }) => (
  <Wrapper>
    <Title>{status}</Title>
    <Card tasks={tasks} status={status} boardId={boardId} />
  </Wrapper>
);

export default Column;

const Wrapper = styled.div`
  background-color: #9090de;
  padding: 20px;
  border-radius: 5px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1`
  color: #fff;
  background-color: #3b3bb1;
  padding: 10px;
  border-radius: 5px;
`;
