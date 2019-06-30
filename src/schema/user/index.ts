/**
 * @fileoverview schema declaration for user
 */

/** -- package imports --  */

import uniqueValidator from "mongoose-unique-validator";

/** -- local imports --  */

import database from "../../lib/database";
import crypto from "../../util/crypto";

/**
 * user schema
 */

const schema = {
    active: Boolean,
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
    mobile: String,
    salt: String,
};

/** generate user schema  */

const user = new database.mongoose.Schema(schema, { timestamps: true });

/** required plugin  */

user.plugin(uniqueValidator, { message: "is already taken" });

/** virtual key for userSchema to get fullname  */

user.virtual("fullName").get((): string => {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

/** to set a password  */

user.methods.setPassword = (password: string): void => {
    this.salt = crypto.randomBytes();
    this.hash = crypto.md5(password, this.salt);
};

/** to validate a password  */

user.methods.validatePassword = (password: string): boolean => {
    const hash = crypto.md5(password, this.salt);
    return hash === this.hash;
};

export default user;
