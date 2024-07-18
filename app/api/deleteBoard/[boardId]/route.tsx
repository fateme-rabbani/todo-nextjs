import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";

export async function DELETE(context: any) {
  try {
    await connectDB();

    const id = context.params.boardId;

    await Board.deleteOne({ _id: id });

    return NextResponse.json({ message: "boad removed" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "there is problem!!" }, { status: 500 });
  }
}
