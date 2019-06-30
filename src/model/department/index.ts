import database from "../../lib/database";
import { departmentSchema } from "../../schema";

const Department = database.mongoose.model("Department", departmentSchema);

export default Department;
