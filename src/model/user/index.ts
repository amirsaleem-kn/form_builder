import mongoose from "mongoose";

const userSchema: any = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String }
});

userSchema.virtual("fullName").get(() => {
    return this.firstName + " " + this.lastName;
});

const user = mongoose.model("user", userSchema);

export default userSchema;
