const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { postRoutes } = require('./routes/post');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    return res.json("From Backend Side");
})

// app.use('/', postRoutes);

app.listen(3500, ()=> {
    console.log("listening...");
})