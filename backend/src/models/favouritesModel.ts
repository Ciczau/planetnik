import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const FavouritesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    activity: { type: Schema.Types.ObjectId, ref: "ActivityTypes" },
  },
  { collection: "favourites" }
);

FavouritesSchema.plugin(mongoosePaginate);

export default mongoose.model("Favourites", FavouritesSchema);
