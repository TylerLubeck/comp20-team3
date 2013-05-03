// Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.      
       google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart0);
      google.setOnLoadCallback(drawChart1);
      google.setOnLoadCallback(drawChart2);
      google.setOnLoadCallback(drawChart3);
      google.setOnLoadCallback(drawChart4);
      function drawChart0() {
          $.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station0, function(data) {
          	console.log(data);
          	var count = new Array();
          	for(i = 1; i < 6; i++)
          		count[i] = 0;
          	for(i = 0; i < data.length; i++)
          		count[data[i].rating]++;
        var data = google.visualization.arrayToDataTable([
          ['Rating', 'Count'],
          ['1',       count[1]],
          ['2',  	  count[2]],
          ['3',       count[3]],
          ['4',  	  count[4]],
          ['5',  	  count[5]]
        ]);
        var options = {
          title: localStorage.station0,
          hAxis: {title: 'Rating', titleTextStyle: {color: 'red'}}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div0'));
        chart.draw(data, options);
      });
     }
     function drawChart1() {
          $.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station1, function(data) {
          	console.log(data);
          	var count = new Array();
          	for(i = 1; i < 6; i++)
          		count[i] = 0;
          	for(i = 0; i < data.length; i++)
          		count[data[i].rating]++;
        var data = google.visualization.arrayToDataTable([
          ['Rating', 'Count'],
          ['1',       count[1]],
          ['2',  	  count[2]],
          ['3',       count[3]],
          ['4',  	  count[4]],
          ['5',  	  count[5]]
        ]);
        var options = {
          title: localStorage.station1,
          hAxis: {title: 'Rating', titleTextStyle: {color: 'red'}}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
        chart.draw(data, options);
      });
     }
           function drawChart2() {
          $.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station2, function(data) {
          	console.log(data);
          	var count = new Array();
          	for(i = 1; i < 6; i++)
          		count[i] = 0;
          	for(i = 0; i < data.length; i++)
          		count[data[i].rating]++;
        var data = google.visualization.arrayToDataTable([
          ['Rating', 'Count'],
          ['1',       count[1]],
          ['2',  	  count[2]],
          ['3',       count[3]],
          ['4',  	  count[4]],
          ['5',  	  count[5]]
        ]);
        var options = {
          title: localStorage.station2,
          hAxis: {title: 'Rating', titleTextStyle: {color: 'red'}}
        };
            console.log("WTF");
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
      });
     }
           function drawChart3() {
          $.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station3, function(data) {
          	console.log(data);
          	var count = new Array();
          	for(i = 1; i < 6; i++)
          		count[i] = 0;
          	for(i = 0; i < data.length; i++)
          		count[data[i].rating]++;
        var data = google.visualization.arrayToDataTable([
          ['Rating', 'Count'],
          ['1',       count[1]],
          ['2',  	  count[2]],
          ['3',       count[3]],
          ['4',  	  count[4]],
          ['5',  	  count[5]]
        ]);
        var options = {
          title: localStorage.station3,
          hAxis: {title: 'Rating', titleTextStyle: {color: 'red'}}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div3'));
        chart.draw(data, options);
      });
     }
           function drawChart4() {
          $.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station4, function(data) {
          	console.log(data);
          	var count = new Array();
          	for(i = 1; i < 6; i++)
          		count[i] = 0;
          	for(i = 0; i < data.length; i++)
          		count[data[i].rating]++;
        var data = google.visualization.arrayToDataTable([
          ['Rating', 'Count'],
          ['1',       count[1]],
          ['2',  	  count[2]],
          ['3',       count[3]],
          ['4',  	  count[4]],
          ['5',  	  count[5]]
        ]);
        var options = {
          title: localStorage.station4,
          hAxis: {title: 'Rating', titleTextStyle: {color: 'red'}}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div4'));
        chart.draw(data, options);
      });
     }