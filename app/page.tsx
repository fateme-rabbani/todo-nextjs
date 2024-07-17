"use client";
import styled from "styled-components";
import { FC, useContext } from "react";
import Link from "next/link";

import Input from "../components/TitleForm";
import { BoardContext } from "./layout";

const Home: FC<NextPageProps> = () => {
  const { boards, createBoard, removeBoard, handleEditBoardTitle } =
    useContext(BoardContext);

  return (
    <Wrapper>
      <Input handleSubmit={(value) => createBoard(value)} />
      <Items>
        {boards.map((board, i) => (
          <Link key={i} href={`/${board.id}`}>
            <Item>
              <span>{board.des}</span>
              <Buttons>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditBoardTitle(board.id, board.des);
                  }}
                >
                  edit
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBoard(board.id);
                  }}
                >
                  delete
                </Button>
              </Buttons>
            </Item>
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
const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.div`
  background-color: #3b3bb1;
  border-radius: 5px;
  padding: 10px;
  font-size: 12px;
  text-align: center;
`;
