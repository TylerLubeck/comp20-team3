var server = 'http://afternoon-anchorage-3983.herokuapp.com';
//var server = 'localhost:5000';
function create(){
    var UN = document.getElementById('UN-create').value;
    var PW = document.getElementById('PW-create').value;
    var NAME = document.getElementById('name-create').value;
    var EM = document.getElementById('email-create').value; 
    serverName = server + '/doesExist';
    $.get(serverName, {'UN':UN}, function(data) {
        console.log(data);
        if (data == 'true') {
            $('#user_taken').show();
        } else {
            $('#user_taken').hide();
            serverName = server + '/makeUser';
            $.post(serverName, {'UN':UN, 'PW':PW, 'EM':EM, 'realName':NAME}, 
                    function(data) {
                        localStorage.userName = NAME;
                        window.location.href = "your_music.html";
            });
        }
    });
}

function login() {
    var UN = document.getElementById('UN-login').value;
    var PW = document.getElementById('PW-login').value;
    console.log('sending password: ' + PW);
    console.log('sending username: ' + UN);
    serverName = server + '/login.json';
    $.get(serverName, {'UN':UN, 'PW':PW}, function(data) {
        console.log('got!');
        if (data != 'false') {
            data = JSON.parse(data);
            console.log(data);
            console.log('data.name: ' + data['name']);
            localStorage.userName = data.name;
            console.log('localStorage.userName: ' + localStorage.userName);
            window.location.href = 'your_music.html';
        } else {
            $('#login_failed').show(); 
        }
    })
    .done(function() {
        console.log('DONE');
    })
    .fail(function() {
        console.log('FAIL');
    });
}

createButton = document.getElementById('createAccount');
loginButton = document.getElementById('loginButton');

createButton.addEventListener('click', create);
loginButton.addEventListener('click', login);
