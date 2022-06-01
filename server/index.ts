const express = require('express');
const login = require('./controllers/user.controller');
const db = require('../db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/test', (req, res) => res.json({ message: 'this is a message!' }));

app.use('/login', login); 

app.post('/save-trip',async(req, res) => {

  const trip = req.body.trip;
  const activities = req.body.activities; 
  const client = await db.getPool().connect();
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
 
app.get('/activities', async(req, res) => {

  let rawFilter = req.query.filter as string;

  let filters = rawFilter.split(',').map(a => `'${a}'`);
 
  const client = await Pool.connect();
  let result;
  try {
    if(rawFilter == 'all')
    { result = await client.query(`SELECT * FROM activity`);
   
    }
    else{
      result = await client.query(`SELECT * FROM activity WHERE 
      activity.category && ARRAY[${filters}]::category[];`);
   
    }
    
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }

  res.json({ message: 'filtering performed successfully!', 
            data: result.rows})
}
);

app.get('/activities-categories', async(req, res) => {

  const client = await Pool.connect();
  let allCategories= await client.query('SELECT enum_range(NULL::category)');
  res.json({data: allCategories.rows[0].enum_range.slice(1,-1).split(',')});
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));