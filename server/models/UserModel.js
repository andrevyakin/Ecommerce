import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        cart: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
);

export default model("User", userSchema);
