const express = require('express');
const userController = require('./controllers/user.controller').router;
const db = require('./db');
import cors from 'cors'
import { jwtMiddleware } from './middlewares/jwt.middleware';
import { exchangeRefreshToken } from './token/jwt';
import { SaveTripRequest } from './types/trip';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => res.json({ message: 'this is a message!' }));

app.use('/user', userController); 

app.post('/refresh', exchangeRefreshToken);

app.get('/activities', async(req, res) => {

  let rawFilter = req.query.filter || 'all';

  let filters = rawFilter.split(',').map(a => `'${a}'`);
 
  const client = await db.getPool().connect();
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
  const client = await db.getPool().connect();
  let allCategories= await client.query('SELECT enum_range(NULL::category)');
  res.json({data: allCategories.rows[0].enum_range.slice(1,-1).split(',')});

  client.release();
});

app.use(jwtMiddleware);

app.post('/save-trip',async(req, res) => {
  const body = req.body as SaveTripRequest;
  const { activities, trip, todos } = body;

  // const activities = req.body.activities;
  const client = await db.getPool().connect();
  try {
    const values = [...Object.values(trip), '', ''];
    let res = await client.query(`INSERT INTO trip(user_id, start_date, end_date, accommodation_link, transport_link) VALUES($1, $2, $3, $4, $5) RETURNING id`, values)
    const tripId = res.rows[0].id;
    
    const activities_values = activities.map((a) => ({ trip_id: tripId, ...a }));
    res = await client.query(`INSERT INTO trip_activity(trip_id, activity_id, day_number, hours, note) VALUES ${activities_values.map((a) => `(${Object.values(a)
      .map(v => typeof v === "string" ? `'${v}'` : v)
    .join(', ')})`)}`);

    const todosValues = todos.map(t => ({ trip_id: tripId, ...t }));
    await client.query(`INSERT INTO to_do(trip_id, checked, description) VALUES ${
      todosValues
        .map(t => `(${Object.values(t)
        .map(v => typeof v === "string" ? `'${v}'` : v)
        .join(', ')})`)
  }`);

    console.log(res)
  } catch (err) {
    return res.status(400).json({
      message: 'Something went wrong while saving the trip!',
    });
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
  
  res.status(201).json({ message: 'trip sucessfully added!' })
})
 



app.get('/trips', async (req, res) => {
  const sqlQuery = `
    select distinct t.*, a.country, a.city
    from trip t
    join trip_activity ta
      on ta.trip_id = t.id
    join activity a
      on ta.activity_id = a.id
    where t.user_id = $1;
  `;

  const userId = req.query.userId;

  const client = await db.getPool().connect();
  try {
    const result = await client.query(sqlQuery, [userId]);
    return res.status(200).json({ trips: result.rows });
  } finally {
    client.release();
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));