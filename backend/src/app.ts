//app.ts


import * as express from 'express'
import * as mongoose from 'mongoose'
import * as path from 'path';
import * as mime from 'mime';
import { createNote, getAllNotes } from './mongo/mongo';
import { Note } from './mongo/models/note';

const app = express();

const PORT = 8080

// THIS STRING IS THE LINK TO OUR MONGODB
const databaseUrl = 'mongodb://localhost:27017'

const pathToDeploy = path.join(__dirname, '..', 'deploy-frontend', 'reiseblog');

// Setup express
app.use(express.static(pathToDeploy, {
    setHeaders: (res, filePath) => res.setHeader('Content-Type', mime.getType(filePath) ?? '')
}))

// mongodb connection
mongoose.connect(databaseUrl, {
    dbName: 'blogs',
    user: 'root',
    pass: 'example',
})
    .then(result => app.listen(PORT, () => console.log(`app running on port ${PORT}`)))
    .catch(err => console.log(err))



app.get('/test', (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Hello World</h1>')
})


app.get('/', (req, res) => {
    res.sendFile(path.join(pathToDeploy, 'index.html'))
})


app.get('/api/notes/create', async (req, res) => {
   try {
    const notes = await createNote(); // create a new note using the createNote() function
    res.send(notes); // Send the retrieved notes as the response
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send('Error creating notes');
  }
});

app.get('/api/notes/getall', async (req, res) => {
    try {
      const notes = await getAllNotes(); // Retrieve all notes using the getAllNotes() function
      res.send(notes); // Send the retrieved notes as the response
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).send('Error retrieving notes');
    }
  });
  