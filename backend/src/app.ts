//app.ts


import * as express from 'express'
import * as mongoose from 'mongoose'
import path from 'path';
import mime from 'mime';

const app = express();

const PORT = 8080

// THIS STRING IS THE LINK TO OUR MONGODB
const databaseUrl = 'mongodb://localhost:27017'

// Setup express
app.use(express.static(path.join(__dirname, '..', 'deploy-frontend', 'reiseblog'), {
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


app.get('/', (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Hello World</h1>')
})
