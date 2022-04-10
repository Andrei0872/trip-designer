import pg from 'pg';
import express from 'express'

const { Pool } = pg;

const connConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
};

const pool = new Pool(connConfig);

const init = async () => {
  try {
    const client = await pool.connect();
  
    console.log('[DB]: Successfully connected.');
  } catch (err: any) {
    console.log(err.message);
  }
}

init();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/test', (req, res) => res.json({ message: 'this is a message!' }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));