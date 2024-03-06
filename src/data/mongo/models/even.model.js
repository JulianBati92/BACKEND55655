import { model, Schema } from "mongoose";

const evenSchema = new Schema(
    {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        description: { type: String },
        attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const Even = model("Even", evenSchema);
export default Even;
