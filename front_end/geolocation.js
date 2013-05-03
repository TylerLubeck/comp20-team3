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
        console.log("got position")
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
        myContent += "<h3>Radio Stations</h3>"
        myContent += "<table id='window_table'>"
        myContent += "<tr><th>Title</th><th>Genre</th><th>Website</th>"
        top5();
        for(var i = 0; i < 5; i++) {
            myContent += "<tr>";
            myContent += "<td>" + closestStations[i].title + "</td>";
            myContent += "<td>" + closestStations[i].genre + "</td>";
            myContent += "<td>" + closestStations[i].website + "</td>";
            myContent += "</tr>";
        }
        myContent += "</table>"

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
    console.log(stations);
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
    console.log(closestCity);
    console.log(closestStations);
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