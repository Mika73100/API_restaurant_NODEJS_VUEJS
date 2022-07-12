const express = require('express');
const app = express();
const monmodule = require('monmodule');

app.listen(5000,()=> console.log('server lsitening @5000'))
app.get('/hello', function(request, response) {
    monmodule.direBonjour();
    monmodule.direBye();})
