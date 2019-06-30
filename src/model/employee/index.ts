import database from "../../lib/database";
import { employeeSchema } from "../../schema";

const Employee = database.mongoose.model("Employee", employeeSchema);

export default Employee;
