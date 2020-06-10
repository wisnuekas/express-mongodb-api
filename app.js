const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//IMPORT ROUTES
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute)

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true 
    }, 
    () => console.log('connection to DB estabilished')
);

//LISTEN TO SERVER
app.listen(3000, () => console.log('listening at port 3000'));