var server = 'http://afternoon-anchorage-3983.herokuapp.com';
function getRank(stationName, i) {
    var tdRankI = $('#tdRank' + i);    
    serverName = server + '/getRanking';
    $.get(serverName, {'station':stationName}, function(data) {
        alert('The station rank is ' + data);
        tdRankI.innerHTML = data;
    });
}
/*
function addRankButton(stationName, i) {
    $('#tdRankButton' + i).click(function() {
        $.
    });
}
*/
