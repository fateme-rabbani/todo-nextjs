import Link from "next/link";
import { revalidatePath } from "next/cache";

import connectDB from "@/utils/connectDB";

import Board from "@/models/Board";
import Input from "@/components/TitleForm";
import toPlainObj from "@/utils/toPlainObj";
import { EditButton } from "./editBoardButton";
import { RemoveButton } from "./removeBoardButton";

export default async function Page() {
  await connectDB();
  const boards = toPlainObj(await Board.find({}).lean());

  return (
    <div className="flex gap-7">
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
      <div className="flex gap-4">
        {boards.map((board, i) => {
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
            <div className="bg-[#9090de] max-w-[150px] rounded" key={i}>
              <Link key={i} href={`/${board._id}`}>
                <h1 className="text-center p-3 text-[20px]">{board.name}</h1>
              </Link>
              <div className="flex justify-between gap-5">
                <EditButton onRequestBoardEdit={handleBoardEdit} />
                <RemoveButton onRequestBoardRemove={handleBoardRemove} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
