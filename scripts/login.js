var server = 'http://afternoon-anchorage-3983.herokuapp.com';

function create(){
    var UN = document.getElementById('UN-create').value;
    var PW = document.getElementById('PW-create').value;
    var NAME = document.getElementById('name-create').value;
    var EM = document.getElementById('email-create').value; 
    console.log('Creating Account!');
    console.log(UN);
    console.log(PW);
    serverName = server + '/doesExist';
    $.get(serverName, {'UN':UN}, function(data) {
        alert('checking for existing...');
        if (data == 'true') {
            console.log('Name already exists');
        } else {
            alert('name is ok');
        /*    
            $.post(server + '/makeUser', {'UN':UN, 'PW':PW, 'EM':EM}, 
                    function(data) {
                        if (data == 'false') {
                            alert('post error!');
                        } else {
                            alert('added');
                        }
                
            });
        */
        }
    });
//    jqxhr.done(function() {alert('done');});
//    .fail(function() {alert('failure');)
//    .always(function() {alert('always'))};


}

createButton = document.getElementById('createAccount');

createButton.addEventListener('click', create);
