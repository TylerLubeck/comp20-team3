var server = 'http://afternoon-anchorage-3983.herokuapp.com';
function getRank(stationName, i) {
    var tdRankI = $('#tdRank' + i);    
    console.log(tdRankI);
    serverName = server + '/getRanking';
    $.get(serverName, {'station':stationName}, function(data) {
        tdRankI.css("background-color", "red");
        tdRankI.text(data);
    });
}

/*
function addRankButton(stationName, i) {
    $('#tdRankButton' + i).click(function() {
        $.
    });
}
*/
