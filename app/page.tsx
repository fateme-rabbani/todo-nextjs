"use client";
import styled from "styled-components";
import { FC, useContext } from "react";
import Link from "next/link";

import Input from "../components/Input";
import { BoardContext } from "./layout";

const Home: FC<NextPageProps> = () => {
  const { boards, createBoard } = useContext(BoardContext);

  return (
    <Wrapper>
      <Input handleSubmit={(value) => createBoard(value)} />
      <Items>
        {boards.map((board, i) => (
          <Link key={i} href={`/${board.id}`}>
            <Item>board {board.des}</Item>
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
