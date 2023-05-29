import { noteSchema } from "../schemas/note.schema";
import mongoose from "mongoose";


//create a Notes Model
export const Note = mongoose.model('Note', noteSchema);