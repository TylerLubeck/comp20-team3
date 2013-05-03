var server = 'http://afternoon-anchorage-3983.herokuapp.com';
function getRank(stationName) {
    
    serverName = server + '/getRanking';
    $.get(serverName, {'station':stationName}, function(data) {
        if(data == undefined) {
            alert('Be the first to rank this station!');
        } else {
            alert('The station rank is ' + data);
        }

    });
}
