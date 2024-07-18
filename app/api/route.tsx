import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";

import Board from "@/models/Board";

export async function GET() {
  try {
    await connectDB();

    const boards = await Board.find();

    return NextResponse.json(
      {
        data: boards,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "there is problem" }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    await connectDB();

    const {
      des,
      tasks: [],
    } = await req.json();

    const newBoard = await Board.create({
      des,
      tasks: [],
    });
    console.log(newBoard);
    return NextResponse.json({ message: "add new board" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "there is problem!" }, { status: 500 });
  }
}

export async function PATCH(req: any) {
  try {
    await connectDB();

    const { _id, des } = await req.json();

    const board = await Board.findOne({ _id });

    board.des = des;

    board.save();

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
