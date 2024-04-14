import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
  },
  { collection: "users" }
);

UserSchema.plugin(mongoosePaginate);

export default mongoose.model("User", UserSchema);
