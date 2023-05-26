import mongoose from "mongoose";
import { noteSchema } from "./schemas/note.schema";
import { Note } from "./models/note";

export function getAllNotes() {
    const s = 'Hello From Here';
    console.log(s);
    return s;
}

export async function createNote() {
    
}
