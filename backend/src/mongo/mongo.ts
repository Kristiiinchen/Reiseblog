import mongoose from "mongoose";
import { noteSchema } from "./schemas/note.schema";
import { Note } from "./models/note";

//function to get all notes within a Collection
export async function getAllNotes() {
    try {
        const notes = await Note.find({}); // Retrieve all notes
        return notes;
      } catch (error) {
        // Handle error
        throw new Error('Failed to retrieve notes: ' + error.message);
      }
    }

//insert a new static note into the Database
export async function createNote() {
   try {
        const notes = Note.create([{name: "First Note", content: "This is the first content"}]);
        return notes;
    } catch(error){
        throw new Error('Failed to insert new notes into Collection' + error.Message);
   }
}

//find a specific note in the Collection
export async function findNote() {
    try{
        const notes =  await Note.findOne({ name: 'Another Note' }).exec();
        return notes;
    } catch(error){
        throw new Error('No such Note found in Collection "notes"' + error.Message);
    }
}

//delete one specific note from the Collection by given id 
export async function deletedNote() {
    try{
        const notes =  await Note.findByIdAndDelete({ _id: '' }).exec();
        return notes;
    } catch(error){
        throw new Error('No such Note found in Collection "notes"' + error.Message);
    }
}