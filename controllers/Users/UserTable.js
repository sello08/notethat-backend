import client from '../../db_connection.js';

const TABLE_NAME = "users";

// Create a new user and insert into database
async function createUser(name, surname, email, password){
    try {
      await client.query(
      `INSERT INTO "${TABLE_NAME}" ("name", "surname", "email", "password")  
       VALUES ($1, $2, $3, $4)`, [name, surname, email, password]); // sends queries
      return true;
  } catch (error) {
      console.error(error.stack);
      return false;
  } 
};

async function isEmailExisting(email){
  try {
    var result = await client.query(`SELECT email FROM ${TABLE_NAME} where email = '${email}'`);
    if(result.rowCount > 0){
      return true;
    }
  } catch (error) {
      console.error(error.stack);
      return false;
  } 
};

async function checkPassword(password){
  try {
    var result = await client.query(`SELECT password FROM ${TABLE_NAME} where password = '${password}'`);
    if(result.rowCount > 0){
      return true;
    }
  } catch (error) {
      console.error(error.stack);
      return false;
  } 
};

async function getUser(email, password){
  try {
    var result = await client.query(`SELECT * FROM ${TABLE_NAME} where email = '${email}' and password='${password}'`);
    if(result.rowCount > 0){
      console.log(result.rows);
      return result.rows[0];
    }
    return false;
  } catch (error) {
      console.error(error.stack);
      return false;
  } 
};

var userTable = {
  createUser,
  isEmailExisting,
  checkPassword,
  getUser
}

export default userTable;
