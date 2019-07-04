const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();
 
app.use(express.static(`${__dirname}/src`));

app.use(bodyParser.json());

app.listen(process.env.PORT || 8080);