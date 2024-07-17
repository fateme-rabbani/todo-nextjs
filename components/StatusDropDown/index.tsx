import styled from "styled-components";
import { FC, useContext } from "react";

import { Status, BoardContext } from "@/app/layout";
interface Select {
  status: Status;
  id: number;
  boardId: number;
}

const StatusDropDown: FC<Select> = ({ status, id, boardId }) => {
  const { removeTask, changeStatus } = useContext(BoardContext);

  const handleChange = (id: number, e: any) => {
    const value = e.target.value;

    if (value === "remove") removeTask(id, boardId);
    else changeStatus(id, value, boardId);
  };
  return (
    <Wrapper value={status} onChange={(e: any) => handleChange(id, e)}>
      <option value="todo">todo</option>
      <option value="doing">doing</option>
      <option value="done">done</option>
      <option value="remove">remove</option>
    </Wrapper>
  );
};

export default StatusDropDown;

const Wrapper = styled.select`
  background-color: #3b3bb1;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
`;
