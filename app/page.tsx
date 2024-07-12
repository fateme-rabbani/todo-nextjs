"use client";
import styled from "styled-components";
import { FC, useState } from "react";
import Link from "next/link";

import Input from "../components/Input";

interface Board {
  id: number;
  des: string;
}

let id = 0;
const makeId = () => ++id;

const d = [
  { id: makeId(), des: "first" },
  { id: makeId(), des: "second" },
];

const Home: FC = () => {
  const [boards, setBoards] = useState<Board[]>(d);

  return (
    <Wrapper>
      <Input
        handleSubmit={(value) => {
          setBoards([...boards, { id: makeId(), des: value }]);
        }}
      />
      <button
        onClick={() => {
          setBoards((prev) => [...prev, { id: makeId(), des: "gholam" }]);
        }}
      >
        add
      </button>
      <Items>
        {boards.map((board, i) => (
          <Link key={i} href={`/${board.id}`}>
            <Item key={i}>board {board.des}</Item>
          </Link>
        ))}
      </Items>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const Items = styled.div`
  display: flex;
  gap: 20px;
`;

const Item = styled.h1`
  padding: 40px;
  background-color: #9090de;
  border-radius: 5px;
`;
