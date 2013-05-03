function submitRankings() {
    var server = 'http:\/\/afternoon-anchorage-3983.herokuapp.com/station_rating';
    $(document).ready(function () {
        $('#submitRanksForm').submit( function() {
            var formData = $(this).serializer();
            $.post(server, formData);
        });
    });
    
}
