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
            type: String
        },
        images: {
            type: String,
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
            default: function() {
                return Math.floor(Math.random()*10000)
            }
        }
    },
    {
        timestamps: true // important
    }
);

export default model("Products", productSchema);
