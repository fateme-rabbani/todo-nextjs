import { Types, Schema, model, models } from "mongoose";

function generateObjectId() {
  return new Types.ObjectId();
}

const boardSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: String,
  columns: [
    {
      _id: { type: Schema.Types.ObjectId, default: generateObjectId },
      name: { type: String, required: true },
      tasks: [
        {
          _id: { type: Schema.Types.ObjectId, default: generateObjectId },
          taskDes: { type: String, required: true },
        },
      ],
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
