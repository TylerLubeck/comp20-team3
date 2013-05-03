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
    if (UN == undefined || PW == undefined) {
        $('#login_failed').show();
        return;
    }
    serverName = server + '/login.json';
    $.get(serverName, {'UN':UN, 'PW':PW}, function(data) {
        if (data != 'false') {
            dataJSON = $.parseJSON(data);
            localStorage.userName = dataJSON.name;
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
