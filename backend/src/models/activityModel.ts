import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const ActivitySchema = new Schema(
  {
    city: String,
    type: { type: Schema.Types.ObjectId, ref: "ActivityTypes" },
    date: Number,
  },
  { collection: "activities" }
);

ActivitySchema.plugin(mongoosePaginate);

export default mongoose.model("Activity", ActivitySchema);
