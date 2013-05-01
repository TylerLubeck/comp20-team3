var server = 'http://afternoon-anchorage-3983.herokuapp.com';
//var server = 'localhost:5000';
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
    })
    .done(function(data) {
      alert('done?');  
    })
<<<<<<< HEAD
=======
    .error(function(jqXHR, textStatus, errorThrown) {
        console.log('FUUUUUUUUUUCK');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        if (textStatus == 'timeout')
            console.log('No Response');

        if (textStatus == 'error')
            console.log(errorThrown);
    })
>>>>>>> master
    .fail(function(data) {
        alert('error');
    });
    
//    jqxhr.done(function() {alert('done');});
//    .fail(function() {alert('failure');)
//    .always(function() {alert('always'))};


}

createButton = document.getElementById('createAccount');

createButton.addEventListener('click', create);
