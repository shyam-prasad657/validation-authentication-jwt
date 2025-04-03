const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { RegisterRoutes } = require('./routes/register');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',  // Explicitly allow your frontend URL
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
  }))
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    return res.json("From Backend Side");
})

app.use('/', RegisterRoutes);

app.listen(3500, ()=> {
    console.log("listening...");
})