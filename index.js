import express from 'express';
const app = express()
import cors from 'cors';
import bodyParser from 'body-parser';
const port = 3000
import NoteController from './controllers/notes/NoteController.js'
import UserController from './controllers/Users/UserController.js'

// parse application/json
app.use(bodyParser.json())


app.use(cors())



NoteController.Register(app);
UserController.Register(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})