import pg from 'pg';

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'notethat',
  password: '1231',
  port: 5432,
})
client.connect().then(res => {
  console.log("Connected: ", res);
})

export default client;