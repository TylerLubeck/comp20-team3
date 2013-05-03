function initialize()
{
        if (navigator.geolocation) {
                generateMap();
                top5();
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

function top5()
{
    stations = JSON.parse(location_json_string);
    console.log(stations);
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

        myContent = "<h1>You are here.</h1>";
        myContent += "<h3>Radio Stations</h3>"

        var windowOptions = {
            content: myContent
        }

        wind = new google.maps.InfoWindow(windowOptions);
        wind.open(map, marker);
}