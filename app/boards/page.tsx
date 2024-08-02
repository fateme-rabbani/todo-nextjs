import Link from "next/link";
import { revalidatePath } from "next/cache";

import { FC } from "react";

import Board from "@/models/Board";
import connectDB from "@/utils/connectDB";
import toPlainObj from "@/utils/toPlainObj";
import { RemoveButton } from "./removeBoardButton";
import { EditButton } from "./editBoardButton";
import Input from "@/components/TitleForm";

const Boards: FC = async () => {
  await connectDB();
  const boards = toPlainObj(await Board.find({}).lean());

  return boards.map((board, i) => {
    async function handleBoardEdit(newName: string) {
      "use server";
      await connectDB();
      const b = await Board.findOne({ _id: board._id });
      if (!b) return;
      b.name = newName;
      b.save();
      revalidatePath("/");
    }

    async function handleBoardRemove() {
      "use server";
      await connectDB();
      await Board.deleteOne({ _id: board._id });
      revalidatePath("/");
    }

    return (
      <div className="flex gap-5" key={i}>
        <div>
          <span>add board</span>
          <Input
            handleSubmit={async (name) => {
              "use server";
              await connectDB();
              await Board.create({
                name,
                columns: [
                  { name: "todo", tasks: [] },
                  { name: "doing", tasks: [] },
                  { name: "done", tasks: [] },
                ],
              });
              revalidatePath("/");
            }}
          />
        </div>
        <div className="bg-violet-400 rounded">
          <Link key={i} href={`/boards/${board._id}`}>
            <h1 className="text-center p-3 text-lg">{board.name}</h1>
          </Link>
          <div className="flex justify-between gap-5">
            <EditButton onRequestBoardEdit={handleBoardEdit} />
            <RemoveButton onRequestBoardRemove={handleBoardRemove} />
          </div>
        </div>
      </div>
    );
  });
};

export default Boards;
