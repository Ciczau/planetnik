import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const ActivityTypeSchema = new Schema(
  {
    name: String,
    image: String,
    location: String,
    conditions: {
      windDirection: String,
      temperature: {
        min: Number,
        max: Number,
      },
      windSpeed: {
        min: Number,
        max: Number,
      },
      precipitation: Boolean,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "activityTypes" }
);

ActivityTypeSchema.plugin(mongoosePaginate);

export default mongoose.model("ActivityTypes", ActivityTypeSchema);
