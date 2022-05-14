const express = require('express');
const login = require(''); // there it goes the login page i guess?
const db = require('../db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/test', (req, res) => res.json({ message: 'this is a message!' }));

app.post('/save-trip',async(req, res) => {

  const trip = req.body.trip;
  const activities = req.body.activities; 
  try {
    const values = Object.values(trip)
    let res = await db.client.query(`INSERT INTO trip(${Object.keys(trip).join(', ')}) VALUES($1, $2, $3, $4, $5) RETURNING id`, values)
    const id = res.rows[0].id;
    const activities_values = activities.map((a:any) => ({...a, trip_id:id}));
    res = await db.client.query(`INSERT INTO trip_activity(${Object.keys(activities_values[0]).join(', ')}) VALUES ${activities_values.map((a:any) => `(${Object.values(a)
      .map(v => typeof v === "string" ? `'${v}'` : v)
    .join(', ')})`)}`)
    console.log(res)
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    db.client.release()
  }
  
  res.json({ message: 'trip sucessfully added!' })
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));