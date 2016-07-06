var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var config = require('./config');
var port = process.env.PORT || config.port;
//var routes = require('./routes/index');
var sendMail = require('./utils/sendmail');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Routes
 * */
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendfile("./public/index.html");
});
app.post('/sendmail',function(req,res){
    console.log('POST')
    res.setHeader('Access-Control-Allow-Origin', '*');
    sendMail(req.body, function(result){
        res.send(result);
    });
});

app.listen(port,function(){
  console.log('Started on PORT ' + port);
});
