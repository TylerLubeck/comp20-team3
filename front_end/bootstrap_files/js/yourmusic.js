	var your_music = [];
	$.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station0 +
			"&username=" + localStorage.userName, function(data) {
				console.log(data);
				your_music += data[0];
			});
	$.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station1 +
			"&username=" + localStorage.userName, function(data) {
				console.log(data);
				your_music += data[0];
			});
	$.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station2 +
			"&username=" + localStorage.userName, function(data) {
				console.log(data);
				your_music += data[0];
			});
	$.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station3 +
			"&username=" + localStorage.userName, function(data) {
				console.log(data);
				your_music += data[0];
			});
	$.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station4 +
			"&username=" + localStorage.userName, function(data) {
				console.log(data);
				your_music += data[0];
			});
			
		console.log(your_music);


