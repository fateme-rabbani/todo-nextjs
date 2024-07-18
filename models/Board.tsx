import { Schema, model, models } from "mongoose";

const boardSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  des: String,
  tasks: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      status: String,
      taskDes: String,
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Board = models.Board || model("Board", boardSchema);

export default Board;
