import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        price: {
            type: Number,
            trim: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String
        },
        images: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        checked: {
            type: Boolean,
            default: false
        },
        sold: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true // important
    }
);

export default model("Products", productSchema);
