/**
 * @fileoverview schema declaration for employee
 */

/** -- package imports --  */

import uniqueValidator from "mongoose-unique-validator";

/** -- local imports --  */

import { Schema } from "mongoose";
import database from "../../lib/database";
import crypto from "../../util/crypto";

/**
 * employee schema
 */

const schema = {
    active: Boolean,
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    firstName: {
        lowercase: true,
        required: [true, "can't be blank"],
        type: String,
    },
    hash: String,
    image: String,
    lastName: {
        lowercase: true,
        required: [true, "can't be blank"],
        type: String,
    },
    middleName: {
        lowercase: true,
        required: [true, "can't be blank"],
        type: String,
    },
    mobile: {
        type: String,
        unique: true,
    },
    salt: String,
};

/** generate employee schema  */

const employee = new database.mongoose.Schema(schema, { timestamps: true });

/** required plugin  */

employee.plugin(uniqueValidator, { message: "is already taken" });

/** virtual key for employeeSchema to get fullname  */

employee.virtual("fullName").get((): string => {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

/** to set a password  */

employee.methods.setPassword = (password: string): void => {
    this.salt = crypto.randomBytes();
    this.hash = crypto.md5(password, this.salt);
};

/** to validate a password  */

employee.methods.validatePassword = (password: string): boolean => {
    const hash = crypto.md5(password, this.salt);
    return hash === this.hash;
};

export default employee;
