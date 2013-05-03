// Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);
      
       google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
          $.get('http://afternoon-anchorage-3983.herokuapp.com/station_info?station=' + localStorage.station0, function(data) {
          	console.log(data);
          	var count = new Array();
          	for(i = 1; i < 6; i++)
          		count[i] = 0;
      
        var data = google.visualization.arrayToDataTable([
          ['Rating', 'Count'],
          ['1',       count[1]],
          ['2',  	  count[2]],
          ['3',       count[3]],
          ['4',  	  count[4]]
          ['5',  	  count[5]]
        ]);

        var options = {
          title: localStorage.station0,
          hAxis: {title: 'Rating', titleTextStyle: {color: 'red'}}
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      });
     }