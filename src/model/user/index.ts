import database from "../../lib/database";
import { userSchema } from "../../schema";

const User = database.mongoose.model("user", userSchema);

export default User;
