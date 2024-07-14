import styled from "styled-components";
import { FC, useContext } from "react";

import { TasksListProps } from "@/app/[boardNumber]/page";
import Select from "../Select";
import { BoardContext } from "@/app/layout";

export const Card: FC<TasksListProps> = ({ tasks, status, boardId }) => {
  const { handleEditTaskTitle } = useContext(BoardContext);

  return tasks
    ?.filter((task) => task.status === status)
    .map((task, i) => (
      <Wrapper key={i}>
        <Title
          onClick={() => handleEditTaskTitle(boardId, task.id, task.taskDes)}
        >
          {task.taskDes}
        </Title>
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
