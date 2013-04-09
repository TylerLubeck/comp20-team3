/* Set up Code... */
var express = require('express');
var dbURL = process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost/mydb';

var collections = ['users'];            
var db = require('mongojs').connect(dbURL, collections);

var app = express.createServer(express.logger());

/* Allow cross-domain access */
app.all('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
});

/* use site.com/login.json?UN=XXXXX&PW=XXXXX
 *
 * Returns true or false, if the password matches the account.
 *
 * Thoughts: Use a cookie to verify if someone is logged in
 *           Potentially 64-bit encode password on client side?
 */
app.get('/login.json', function(request, response) {
    userName = request.query.UN;
    password = request.query.PW;
    cursor = db.users.find({'user':userName}, {'fields':'password'});
    if(cursor && cursor.password == password) {
        response.send('true'); 
    } else {
        response.send('false');
    }
});


/* use site.com/doesExist?UN=XXXXX 
 * 
 * Allows us to check if an account name exists, so that we don't have
 * multiple people with the same account 
 */
app.get('/doesExist', function(request, response) {
    var outerCount = 0;
    userName = request.query.UN;
    
    cursor = db.users.count({'user':userName}, function(err, count) {
        outerCount = count;
        console.log('inside callback' + outerCount);
        if(count == 0) {
            response.send('false');
        } else {
            response.send('true');
        }
    });
});


/* Use site.com/makeUser?UN=XXXX&PW=XXXX&EM=XXXX
 *
 * Should only be called if doesExist returns false
 *
 * MUST CHECK /doesExist BEFORE CALLING THIS. VERY IMPORTANT.
 */
app.post('/makeUser', function(request, response) {
    userName = request.query.UN;
    passWord = request.query.UN;
    email = request.query.EM; 

    db.users.save({'user':userName, 'password':passWord, 'email':email},
        function(err) {
            if (err) response.send('false');
            else response.send('true');    
    });    
    
});


var port = process.env.PORT || 7000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

process.on('SIGTERM', function() {
    console.log('sig term');
});
