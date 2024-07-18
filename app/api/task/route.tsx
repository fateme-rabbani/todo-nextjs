import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";

import Board from "@/models/Board";

export async function POST(req: any) {
  try {
    await connectDB();

    const { _id, tasks } = await req.json();

    const board = await Board.findOne({ _id });

    board.tasks.push(tasks);
    board.save();

    return NextResponse.json({ message: "add new board" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "there is problem!" }, { status: 500 });
  }
}

export async function PATCH(req: any) {
  try {
    await connectDB();

    const { _id, tasks } = await req.json();
    let task;
    if (tasks.status) {
      task = await Board.updateOne(
        { "tasks._id": _id },
        { $set: { "tasks.$.status": tasks.status } }
      );
    } else if (tasks.taskDes) {
      task = await Board.updateOne(
        { "tasks._id": _id },
        { $set: { "tasks.$.taskDes": tasks.taskDes } }
      );
    }

    console.log(task);

    return NextResponse.json(
      {
        message: "edit successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "there is problem22" }, { status: 500 });
  }
}
