import pg, { PoolClient } from 'pg';
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

app.use(express.json());

app.get('/test', (req, res) => res.json({ message: 'this is a message!' }));

app.post('/save-trip',async(req, res) => {

  const trip = req.body.trip;
  const activities = req.body.activities;
  const client = await pool.connect()
  try {
    const values = Object.values(trip)
    let res = await client.query(`INSERT INTO trip(${Object.keys(trip).join(', ')}) VALUES($1, $2, $3, $4, $5) RETURNING id`, values)
    const id = res.rows[0].id;
    const activities_values = activities.map((a:any) => ({...a, trip_id:id}));
    res = await client.query(`INSERT INTO trip_activity(${Object.keys(activities_values[0]).join(', ')}) VALUES ${activities_values.map((a:any) => `(${Object.values(a)
      .map(v => typeof v === "string" ? `'${v}'` : v)
    .join(', ')})`)}`)
    console.log(res)
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
  
  res.json({ message: 'trip sucessfully added!' })
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));