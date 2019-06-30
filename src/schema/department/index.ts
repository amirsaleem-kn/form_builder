/**
 * @fileoverview schema declaration for department
 */

/** -- package imports --  */

import uniqueValidator from "mongoose-unique-validator";

/** -- local imports --  */

import { Schema } from "mongoose";
import database from "../../lib/database";

/**
 * department schema
 */

const schema = {
    active: Boolean,
    alias: {
        lowercase: true,
        required: [true, "can't be blank"],
        type: String,
        unique: true,
    },
    employees: [
        {
            ref: "Employee",
            type: Schema.Types.ObjectId,
        }
    ],
    name: {
        lowercase: true,
        required: [true, "can't be blank"],
        type: String,
        unique: true,
    },
};

/** generate department schema  */

const department = new database.mongoose.Schema(schema, { timestamps: true });

/** required plugin  */

department.plugin(uniqueValidator, { message: "is already taken" });

export default department;
