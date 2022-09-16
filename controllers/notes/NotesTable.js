import client from '../../db_connection.js';

const TABLE_NAME = "notes";

// Get all notes from database -----------------------------------------------------
async function getNotes(userId) {
    const res = await client.query(`SELECT * FROM notes WHERE "isDeleted" = false AND "creator" = '${userId}'`)
    return res.rows;
  }
  // Get deleted notes from database -----------------------------------------------------
async function getDeletedNotes(userId) {
  const res = await client.query(`SELECT * FROM notes WHERE "isDeleted" = true AND "creator" = '${userId}'`)
  return res.rows;
}
  //Delete note form database --------------------------------------------------------
  async function deleteNote(id){
    try {
        await client.query('UPDATE "notes" SET "isDeleted" = true WHERE "id" =' + id); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
  };
 /* //Delete note form database --------------------------------------------------------
  async function deleteNote(id){
    try {
        await client.query('DELETE FROM "notes" WHERE "id" =' + id); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
  }; */
  //create a new note and insert into database ---------------------------------------
  async function createNote(header, content, userId){
    try {
      await client.query(
      `INSERT INTO "notes" ("header", "content", "creator")  
       VALUES ($1, $2, $3)`, [header, content, userId]); // sends queries
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
    updateNote,
    getDeletedNotes
  }
  
  export default notesTable;