import { FC, useState } from "react";
import styled from "styled-components";

interface Input {
  handleSubmit: (value: string) => void;
}

const Input: FC<Input> = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(value);
        setValue("");
      }}
    >
      <InputStyle value={value} onChange={(e) => setValue(e.target.value)} />
      <Button type="submit" value="add" />
    </form>
  );
};

export default Input;

const Button = styled.input`
  width: 50px;
  border-radius: 5px;
  font-size: 20px;
  background-color: #9090de;
`;
const InputStyle = styled.input`
  border-radius: 5px;
  height: 27px;
`;
