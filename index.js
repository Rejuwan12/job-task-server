const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('Job Task Server Running....')
})

app.listen(port,(req, res) => {
    console.log(`Job Task Server is Running On Port: ${port}`);
} )