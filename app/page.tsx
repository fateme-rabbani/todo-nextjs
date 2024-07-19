import { Box, Button, Stack, styled } from "@mui/material";
import { FC } from "react";
import Link from "next/link";

import Input from "../components/TitleForm";
import useBoards from "@/contexts/board";
import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";

export default async function Page() {
  // const { boards, createBoard, removeBoard, handleEditBoardTitle } =
  //   useBoards();

  await connectDB();
  const boards = await Board.find();

  return (
    <Stack direction="row" gap={1}>
      {/* <Input handleSubmit={(value) => createBoard(value)} /> */}
      <Stack direction="row" gap={1}>
        {boards.map((board, i) => (
          <Link key={i} href={`/${board._id}`}>
            <Box sx={{ padding: 5, background: "#9090de", borderRadius: 1 }}>
              <Box component="h1">{board.des}</Box>
              <Stack direction="row" gap={1}>
                <Button
                  sx={{
                    color: "#fff",
                    background: "#3b3bb1",
                    padding: 10,
                    textAlign: "center",
                    fontSize: 12,
                    border: "2px solid #3B3BB1",
                    borderRadius: 10,
                  }}
                  // onClick={(e: any) => {
                  //   e.stopPropagation();
                  //   handleEditBoardTitle(board._id, board.des);
                  // }}
                >
                  edit
                </Button>
                <Button
                  sx={{
                    color: "#fff",
                    background: "#3b3bb1",
                    padding: 10,
                    textAlign: "center",
                    fontSize: 12,
                    border: "2px solid #3B3BB1",
                    borderRadius: 10,
                  }}
                  // onClick={(e: any) => {
                  //   e.stopPropagation();
                  //   removeBoard(board._id);
                  // }}
                >
                  delete
                </Button>
              </Stack>
            </Box>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
