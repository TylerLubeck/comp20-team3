var express = require('express');
var dbURL = process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost/mydb';

var collections = ['users'];            
var db = require('mongojs').connect(dbURL, collections);

var app = express.createServer(express.logger());


app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
});

app.get('/login.json', function(req, res) {
    userName = request.query.UN;
    password = request.query.PW;
    cursor = db.users.find({'user':userName}, {'fields':'password'});
    if(cursor && cursor.password == password) {
        response.send('true'); 
    } else {
        response.send('false');
    }
});

app.get('/doesExist', function(req, res) {
    var outerCount = 0;
    userName = request.query.UN;
    cursor = db.users.count({'user':userName}, function(err, count) {
        outerCount = count;
    });

    if(outerCount = 0) {
        response.send('true');
    } else {
        response.send('false');
    }

});

app.post('/makeUser', function(req, res) {
    
});
