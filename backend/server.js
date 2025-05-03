const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { RegisterRoutes } = require('./routes/register');
const { LoginRoutes } = require('./routes/login');
const cookieParser = require("cookie-parser");
const { refreshTokenRoutes } = require('./routes/refreshToken');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',  // Explicitly allow your frontend URL
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
  }))
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res)=> {
    return res.json("From Backend Side");
})

app.use('/', RegisterRoutes);
app.use('/', LoginRoutes);
app.use('/', refreshTokenRoutes);

app.listen(3500, ()=> {
    console.log("listening...");
})