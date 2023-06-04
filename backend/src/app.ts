//app.ts
import express from "express";
import mongoose from "mongoose";
import * as path from "path";
import * as mime from "mime";
import {
  createNote,
  deletedNote,
  findNote,
  getAllNotes,
} from "./mongo/mongo.js";
import { readOptions } from "./config/helper.js";
import { fileURLToPath } from "url";

// ECMAScript Module Magic to recreate the __dirname variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Config
const options = await readOptions(path.join(__dirname, "..", "config.json"));
const app = express();

const EXPRESS_PORT = options.express.port;

// THIS STRING IS THE LINK TO OUR MONGODB
const databaseUrl = `mongodb://${options.mongo.host}:${options.mongo.port}`;

const pathToDeploy = path.join(__dirname, "..", "deploy-frontend", "reiseblog");

// Setup express
app.use(
  express.static(pathToDeploy, {
    setHeaders: (res, filePath) =>
      res.setHeader("Content-Type", mime.getType(filePath) ?? ""),
  })
);

// mongodb connection
mongoose
  .connect(databaseUrl, {
    dbName: options.mongo.db,
    user: options.mongo.user,
    pass: options.mongo.password,
  })
  .then((result) =>
    app.listen(EXPRESS_PORT, () =>
      console.log(`app running on port ${EXPRESS_PORT}`)
    )
  )
  .catch((err) => console.log(err));

app.get("/test", (req: express.Request, res: express.Response) => {
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World</h1>");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(pathToDeploy, "index.html"));
});

//create a new entry in the Collection "notes"
app.get("/api/notes/create", async (req, res) => {
  try {
    const notes = await createNote(); // create a new note using the createNote() function
    res.send(notes); // Send the retrieved notes as the response
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send("Error creating notes");
  }
});

//get all notes from collection
app.get("/api/notes/getall", async (req, res) => {
  try {
    const notes = await getAllNotes(); // Retrieve all notes using the getAllNotes() function
    res.send(notes); // Send the retrieved notes as the response
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send("Error retrieving notes");
  }
});

//Get one specific note
app.get("/api/notes/getone", async (req, res) => {
  try {
    const notes = await findNote(); // Retrieve one specific note using the findNotes() function
    res.send(notes); // Send the retrieved notes as the response
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send("Error retrieving notes");
  }
});

//delete one specific note
app.get("/api/notes/deleteone", async (req, res) => {
  try {
    const notes = await deletedNote(); // Delete one specific note by given id using the deletedNotes() function
    res.send(notes); // Send the deleted notes as the response
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send("Error retrieving notes");
  }
});
