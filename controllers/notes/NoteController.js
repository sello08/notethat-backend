import notesTable from "./NotesTable.js";

function Register(app) {
    app.get('/get-notes', getNotes);
    app.post('/note', postFunction)
    app.put('/note/:noteId', updateFunction)
    app.delete('/note/:noteId', deleteFunction)
}

//--------------------------Get Function----------------------------------------

async function getNotes(req, res) {
    const notes = await notesTable.getNotes();
    res.send(notes);
}

//--------------------------Post Function----------------------------------------


async function postFunction(req, res) {
    if (!req.body.header || req.body.header === "") {
        res.send("Header cannot be empty");
    }else{
        const created = await notesTable.createNote(req.body.header, req.body.content)
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