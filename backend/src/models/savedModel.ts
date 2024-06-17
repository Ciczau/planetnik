import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const SavedSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    activity: { type: Schema.Types.ObjectId, ref: "Activity" },
  },
  { collection: "saved" }
);

SavedSchema.plugin(mongoosePaginate);

export default mongoose.model("Saved", SavedSchema);
