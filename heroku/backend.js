/* Set up Code... */
var express = require('express');
var sanitize = require('validator').sanitize;
var SendGrid = require('sendgrid').SendGrid;
var sendgrid = new SendGrid(
        process.env.SENDGRID_USERNAME,
        process.env.SENDGRID_PASSWORD
        );


var dbURL = process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost/mydb';

var collections = ['users', 'radioInfo', 'stationRatings'];            
var db = require('mongojs').connect(dbURL, collections);
   
var app = express();

/* Allow cross-domain access */
app.use(express.bodyParser());
/* Allow cross-domain access */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});



app.get('/station_info', function(request, response){
	station = request.body.station;
	db.stationRatings.find({'station':station}, function(err, cursor){
		if(err){
			response.send('error');
		}
		console.log(cursor);
		response.send(cursor);
	});
	
});



app.post('/station_rating', function(request, response){
	station = sanitize(request.body.station).escape();
	rating = sanitize(request.body.rating).escape();
    user = sanitize(request.body.user).escape();
    //console.log('REQUEST IS: ' + request.body);
    console.log('USER IS: ' + user);
	db.stationRatings.save({'station':station, 'rating':rating, 'user':user});
//	response.send('success');
response.send("<script> window.location.href = 'http:/roadtriprocking.com/front_end/index.html';</script>");
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
    db.users.find({'user':userName}, function(err, cursor) {
           if(err) {
                response.send('false');
           }
           console.log(cursor);
           if ( cursor && cursor[0].password == password ) {
                console.log('PASSWORD: ' + password);
                console.log('CURSOR PASSWORD: ' + cursor[0].password);
                console.log('USERNAME: ' + cursor[0].user);
                response.send(cursor[0].realName);
           }

           response.send('false');
    });
});


/* use site.com/doesExist?UN=XXXXX 
 * 
 * Allows us to check if an account name exists, so that we don't have
 * multiple people with the same account 
 */
app.get('/doesExist', function(request, response) {
    userName = request.query.UN;
    if(!userName) {
        response.send('error');
        return;
    }
    db.users.find({'user':userName}, function(err, cursor){
        if(err) {
            console.log('error' + err);
            response.send('error');
            return;
        }
        if (cursor.length > 0 ) {
            response.send('true');   
        } else {
            response.send('false');
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
    userName = sanitize(request.body.UN).escape();
    passWord = sanitize(request.body.PW).escape();
    realName = sanitize(request.body.realName).escape();
    email = request.body.EM; 
    console.log(request.body);
    db.users.save({'user':userName, 'password':passWord, 'email':email,
                    'realName':realName});
    sendgrid.send({
        'to': email,
        'from': 'tyler@tylerlubeck.com',
        'subject': 'Welcome to RoadTripRockin!',
        'text': 'Welcome to RoadTripRocking! We\'re delighted that you\'ve joined our endeavor to fill your trips with tunes!'
    });

    response.send('success');
});

app.post('/rankStation', function(request, response) {
    station = sanitize(request.body.station).escape();
    ranking = sanitize(parseInt(request.body.rank)).escape();
    db.radioInfo.find({'station': station}, function(err, cursor) {
        if ( cursor == undefined) {
            db.radioInfo.save({'station': station, 'rankFull': ranking, 'numRankings':1, 'average':1});
        }
        else {
            tempRankFull = cursor[0].rankFull + ranking;
            tempNumRanks = cursor[0].numRankings + 1;
            tempAverage = Math.floor(tempRanking / tempNumRanks);
            db.radioInfo.update(cursor[0], {'station':station, 'rankFull':tempRankFull, 'numRankings':tempNumRanks, 'average':tempAverage});
        }
    });
    response.send(0);
});

app.get('/getRanking', function(request, response) {
    station = request.query.station;
    db.radioInfo.find({'station':station}, function(err, cursor) {
            console.log('CURSOR: ' + cursor);
        if(cursor.length < 1) {
            response.send('false');
        } else {
            response.send(cursor[0].average);
        }
    });
});


app.get('/usersearch.json', function(request, response) {
    var username = request.query.username;
    var listenedto = [];
    db.stationRatings.find({user:username}).limit(20, function(err, scores) {
        if (err || !scores.length) {
            console.log("Game not found");
        } else {
            scores.forEach(function(score) {
                listenedto.push(score);
            });
        }
        response.set('Content-Type', 'text/json');
        response.send(listenedto);
    });
});

app.get('/*', function(request, response) {
	response.send(404);
});

var port = process.env.PORT || 7000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
