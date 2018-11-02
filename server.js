require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sendMail = require('./utils/sendmail');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Routes
 * */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendfile('./public/index.html');
});
app.post('/sendmail', function(req,res){
    console.log('POST');
    res.setHeader('Access-Control-Allow-Origin', '*');
    sendMail(req.body, function(result){
        res.send(result);
    });
});

app.listen(process.env.PORT, function(){
  console.log('Started on PORT ' + process.env.PORT);
});
