import jwt from 'jsonwebtoken';
import notesTable from "./NotesTable.js";

const secret = "my_secret";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
   

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.sendStatus(403)
      req.user = decoded
      next()
    })
}

function Register(app) {
    app.get('/get-notes', authenticateToken, getNotes);
    app.post('/note', authenticateToken, postFunction)
    app.put('/note/:noteId', authenticateToken, updateFunction)
    app.delete('/note/:noteId', authenticateToken, deleteFunction)
}

//--------------------------Get Function----------------------------------------

async function getNotes(req, res) {
    const notes = await notesTable.getNotes(req.user.userId);
    console.log("req.user", req.user);
    res.send(notes);
}

//--------------------------Post Function----------------------------------------


async function postFunction(req, res) {
    if (!req.body.header || req.body.header === "") {
        res.send("Header cannot be empty");
    }else{
        const created = await notesTable.createNote(req.body.header, req.body.content, req.user.userId)
        res.send(created)
    }
}

//--------------------------Update Function----------------------------------------


async function updateFunction(req, res) {                                       
    console.log("req.body.name", req.body.name);
    if (!req.params.noteId) {
        res.send({
            message: "Note id must be given!"
        })
    }else{
        const updated = await notesTable.updateNote(req.params.noteId, req.body.header, req.body.content)
        res.send(updated)
    }
}

//--------------------------Delete Function----------------------------------------


async function deleteFunction(req, res){
    if (!req.params.noteId) {
        res.send({
            message: "Note id must be given!"
        })
    }else{
       const deleted = await notesTable.deleteNote(req.params.noteId)
        res.send(deleted);
    }
}


var myFunctions = {
    Register
}


export default myFunctions;