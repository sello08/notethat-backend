import client from '../../db_connection.js';

const TABLE_NAME = "notes";

// Get all notes from database -----------------------------------------------------
async function getNotes() {
    const res = await client.query('SELECT * from notes')
    return res.rows;
  }
  //Delete note form database --------------------------------------------------------
  async function deleteNote(id){
    try {
        await client.query('DELETE FROM "notes" WHERE "id" =' + id); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
  };
  //create a new note and insert into database ---------------------------------------
  async function createNote(header, content){
    try {
      await client.query(
      `INSERT INTO "notes" ("header", "content")  
       VALUES ($1, $2)`, [header, content]); // sends queries
      return true;
  } catch (error) {
      console.error(error.stack);
      return false;
  } 
  };
  //  Update a note in database ------------------------------------------------------
  async function updateNote(id, header, content){
    try {
      await client.query(
      `UPDATE "notes" SET header = $1, content = $2
       WHERE id =` +id, [header, content]); // sends queries
      return true;
  } catch (error) {
      console.error(error.stack);
      return false;
  } 
  };

  var notesTable = {
    getNotes,
    deleteNote,
    createNote,
    updateNote
  }
  
  export default notesTable;