import { Box, Stack, Card } from "@mui/material";

import Link from "next/link";
import { revalidatePath } from "next/cache";

import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";
import Input from "../components/TitleForm";
import { EditButton } from "./editBoardButton";
import { RemoveButton } from "./removeBoardButton";

export default async function Page() {
  await connectDB();
  const boards = await Board.find();

  return (
    <Stack direction="row" gap={1}>
      <Input
        handleSubmit={async (des) => {
          "use server";
          await connectDB();

          await Board.create({
            des,
            tasks: [],
          });
          revalidatePath("/");
        }}
      />
      <Stack direction="row" gap={1}>
        {boards.map((board, i) => {
          async function boardEdit(newDes: string) {
            "use server";
            await connectDB();

            const b = await Board.findOne({ _id: board._id });
            b.des = newDes;
            b.save();

            revalidatePath("/");
          }
          async function boardRemove() {
            "use server";
            await connectDB();

            await Board.deleteOne({ _id: board._id });

            revalidatePath("/");
          }
          return (
            <Card
              key={i}
              sx={{ maxWidth: 150, background: "#9090de", borderRadius: 2 }}
            >
              <Link key={i} href={`/${board._id}`}>
                <Box component="h1" sx={{ padding: 1, textAlign: "center" }}>
                  {board.des}
                </Box>
              </Link>
              <Stack direction="row" justifyContent="space-between" gap={1}>
                <EditButton onRequestBoardEdit={boardEdit} />
                <RemoveButton onRequestBoardRemove={boardRemove} />
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
}
