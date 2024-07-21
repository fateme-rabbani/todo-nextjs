import { Types, Schema, model, models } from "mongoose";

function generateObjectId() {
  return new Types.ObjectId();
}

const boardSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  des: String,
  tasks: [
    {
      _id: { type: Schema.Types.ObjectId, default: generateObjectId },
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

const getBoardModel = () => model("Board", boardSchema);
const Board =
  (models.Board as ReturnType<typeof getBoardModel>) || getBoardModel();
export default Board;
