function initialize()
{
        if (navigator.geolocation) {
                generateMap();
                navigator.geolocation.getCurrentPosition(showPosition);
        } else {
                document.getElementById("map_canvas").innerHTML =
                        "Geolocation is not supported by your browser.";
        }
}

function generateMap()
{
        latlng = new google.maps.LatLng(42.330497742, -71.095794678);
 
        var styles = [
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "color": "#7f1862" }
                ]
            },{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "color": "#002973" }
                ]
            },{
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "color": "#fd7c00" }
                ]
            }
        ]

        var styledMap = new google.maps.StyledMapType(styles, {name: "Color"});

        mapOptions = {
                zoom: 15,
                center: latlng,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']    
                }
        };
        map = new google.maps.Map(document.getElementById ("map_canvas"),
                                  mapOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
}

function showPosition(position)
{
        latlng = new google.maps.LatLng(position.coords.latitude,
                                        position.coords.longitude);

        myLat = position.coords.latitude;
        myLng = position.coords.longitude;

        //Change map position when geolocation is acquired
        map.panTo(latlng);

        var markerOptions = {
                map: map,
                position: latlng,
                visible: true
        }

        marker = new google.maps.Marker(markerOptions);

        myContent = "";
        myContent += "<h3>Top Radio Stations in "
        top5();
        myContent += closestCity + "</h3>"
        myContent += "<table id='window_table'>"
        myContent += "<tr><th>Title</th><th>Genre</th><th>Website</th><th>Ranking</th>"


        for(i = 0; i < 5; i++) {
                getRank(closestStations[i].title, i);
                //addRankButton(closestStations[i].title, i);     
        }

        rank_form = "";
        rank_form += '<form action="http:\/\/afternoon-anchorage-3983.herokuapp.com/station_rating" method="post">';
        rank_form += '<select name="stations">';

        for(var i = 0; i < 5; i++) {
            myContent += "<tr>";
            myContent += "<td>" + closestStations[i].title + "</td>";
            myContent += "<td>" + closestStations[i].genre + "</td>";
            myContent += "<td>" + "<a href=http://" + closestStations[i].website + ">" 
            myContent += closestStations[i].website + "</a></td>";
            myContent += "<td id='tdRank" + i + "'></td>";
            myContent += "</tr>";
            rank_form += '<option value="' + closestStations[i].title + '">';
            rank_form += closestStations[i].title;
            rank_form += '</option>';
        }
        myContent += "</table>"
        rank_form += '</select>';
        
        myContent += "<h3>Rank the station you're listening to! </h3>"

        rank_form += ' 1 <input type="radio" name="ranking" value="1">  ';
        rank_form += '2 <input type="radio" name="ranking" value="2">  ';
        rank_form += '3 <input type="radio" name="ranking" value="3">  ';
        rank_form += '4 <input type="radio" name="ranking" value="4">  ';
        rank_form += '5 <input type="radio" name="ranking" value="5">  ';
        rank_form += '<input type="submit" value="Submit">';
        rank_form += '</form>';
        myContent += rank_form;

        var windowOptions = {
            //maxWidth: 1000,
            content: myContent
        }

        wind = new google.maps.InfoWindow(windowOptions);
        wind.open(map, marker);
}

function top5()
{
    stations = JSON.parse(location_json_string);
    nearestLoc();
}

function nearestLoc()
{
    max = 250000;
    $.each(stations, function(key, value) {
        if(value.latitude != null && value.longitude!= null) {
            var d = distance(value.latitude, value.longitude);

            if (d < max) {  
                closestCity = key;
                closestStations = value;
                max = d;
            }
        }
    });
}

function distance(toLat, toLng)
{
        var R = 6371 / 1.609344;
        var x1 = toLat - myLat;
        var dLat = toRad(x1);
        var x2 = toLng - myLng;
        var dLon = toRad(x2);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(toRad(myLat)) * Math.cos(toRad(toLat)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; 

        return d; 
}

function toRad(degrees)
{
        return degrees * Math.PI / 180;
}
