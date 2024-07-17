"use client";
import { Box, Button, Stack, styled } from "@mui/material";
import { FC, useContext } from "react";
import Link from "next/link";

import Input from "../components/TitleForm";
import { BoardContext } from "./layout";

export const CustomButton = styled(Button)({
  color: "#fff",
  background: "#3b3bb1",
  padding: 10,
  textAlign: "center",
  fontSize: 12,
  border: "2px solid #3B3BB1",
  borderRadius: 10,
});

const Home: FC<NextPageProps> = () => {
  const { boards, createBoard, removeBoard, handleEditBoardTitle } =
    useContext(BoardContext);

  return (
    <Stack direction="row" gap={1}>
      <Input handleSubmit={(value) => createBoard(value)} />
      <Stack direction="row" gap={1}>
        {boards.map((board, i) => (
          <Link key={i} href={`/${board.id}`}>
            <Box sx={{ padding: 5, background: "#9090de", borderRadius: 1 }}>
              <Box component="h1">{board.des}</Box>
              <Stack direction="row" gap={1}>
                <CustomButton
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleEditBoardTitle(board.id, board.des);
                  }}
                >
                  edit
                </CustomButton>
                <CustomButton
                  onClick={(e: any) => {
                    e.stopPropagation();
                    removeBoard(board.id);
                  }}
                >
                  delete
                </CustomButton>
              </Stack>
            </Box>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default Home;
