import mongoose from "mongoose";

export const noteSchema = new mongoose.Schema({
    name: String,
    content: String
})