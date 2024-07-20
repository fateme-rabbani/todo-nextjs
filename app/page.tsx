import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";

import Input from "../components/TitleForm";
import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";
import { EditButton } from "./gholam";
import { revalidatePath } from "next/cache";

export default async function Page() {
  await connectDB();
  const boards = await Board.find();

  return (
    <Stack direction="row" gap={1}>
      {/* <Input handleSubmit={(value) => createBoard(value)} /> */}
      <Stack direction="row" gap={1}>
        {boards.map((board, i) => {
          async function boardEdit(newDes: string) {
            "use server";
            await connectDB();

            // edit:
            const b = await Board.findOne({ _id: board._id });
            b.des = newDes;
            b.save();

            // delete:
            // await Board.deleteOne({ _id: board._id });

            revalidatePath("/");
          }

          return (
            // <Link key={i} href={`/${board._id}`}>
            <Box
              key={i}
              sx={{ padding: 5, background: "#9090de", borderRadius: 1 }}
            >
              <Box component="h1">{board.des}</Box>
              <Stack direction="row" gap={1}>
                <EditButton onRequestBoardEdit={boardEdit} />
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
            // </Link>
          );
        })}
      </Stack>
    </Stack>
  );
}
