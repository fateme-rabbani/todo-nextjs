import styled from "styled-components";
import { FC } from "react";

import { TasksListProps } from "@/app/[boardNumber]/page";
import Select from "../Select";

export const Card: FC<TasksListProps> = ({ tasks, status, boardId }) => {
  return tasks
    ?.filter((task) => task.status === status)
    .map((task, i) => (
      <Wrapper key={i}>
        <Title>{task.taskDes}</Title>
        <Select status={task.status} id={task.id} boardId={boardId} />
      </Wrapper>
    ));
};
export default Card;

const Wrapper = styled.div`
  background-color: #5f5fc2;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  color: #fff;
`;
