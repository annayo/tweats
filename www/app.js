// If you want to prevent dragging, uncomment this section
/*
function preventBehavior(e) 
{ 
 e.preventDefault(); 
};
document.addEventListener("touchmove", preventBehavior, false);
*/

/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
for more details -jm */
/*
function handleOpenURL(url)
{
 // TODO: do something with the url passed in.
}
*/

function loader() {
    var state = document.readyState;
    if (state == 'loaded' || state == 'complete') {
        locate();
    } else {
        if (navigator.userAgent.indexOf('Browzr') > -1) {
            setTimeout(run, 250);
        } else {
            document.addEventListener('deviceready', locate, false);
        }
    }
}

function locate () {
    var win = function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var point = new google.maps.LatLng(lat, long);
        var map_element = document.getElementById("map_canvas");
        var config = {
            center: point,
            zoom: 17,
			disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

        map = new google.maps.Map(map_element, config);
        
		setMarkers(map, [point]);

		
        
        /*
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: ' + position.coords.latitude    + '<br />' +
        'Longitude: '          + position.coords.longitude             + '<br />' +
        'Altitude: '           + position.coords.altitude              + '<br />' +
        'Accuracy: '           + position.coords.accuracy              + '<br />' +
        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
        'Heading: '            + position.coords.heading               + '<br />' +
        'Speed: '              + position.coords.speed                 + '<br />' +
        'Timestamp: '          + new Date(position.timestamp)          + '<br />';
        */
    };
    
    var fail = function(e) {
        alert('Can\'t retrieve position.\nError: ' + e);
    };
    
    watchID = navigator.geolocation.getCurrentPosition(win, fail);
}

// Add markers to the map
function setMarkers(map, locations) {
	// Marker sizes are expressed as a Size of X,Y
	// where the origin of the image (0,0) is located
	// in the top left of the image.

	// Origins, anchor positions and coordinates of the marker
	// increase in the X direction to the right and in
	// the Y direction down.
	var image = new google.maps.MarkerImage('images/pin-red.png',
	    // This marker is 29 pixels wide by 37 pixels tall.
	    new google.maps.Size(29, 37),
	    // The origin for this image is 0, 0.
	    new google.maps.Point(0, 0),
	    // The anchor for this image is the base of the flagpole at 0, 32.
	    new google.maps.Point(0, 37));
	var shadow = new google.maps.MarkerImage('images/pin-shadow.png',
	    // The shadow image is larger in the horizontal dimension
	    // while the position and offset are the same as for the main image.
	    new google.maps.Size(23, 21),
	    new google.maps.Point(0, 0),
	    new google.maps.Point(0, 21));
    // Shapes define the clickable region of the icon.
    // The type defines an HTML <area> element 'poly' which
    // traces out a polygon as a series of X,Y points. The final
    // coordinate closes the poly by connecting to the first
    // coordinate.
	var shape = {
	    coord: [1, 1, 1, 20, 18, 20, 18 , 1],
	    type: 'poly'
	};
	
	var marker = new google.maps.Marker({
        position: locations[0],
        map: map,
        shadow: shadow,
        icon: image,
        shape: shape,
        title: 'Truck Title'
    });
	
	// marker tooltip
	var boxText = document.createElement("div");
	        boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: pink; padding: 5px;";
	        boxText.innerHTML = "Truck Name<br />Kind of food<br />Hours 12pm - 3pm";
	
	var infoWindow = new google.maps.InfoWindow({
		content: boxText,
		maxWidth: 0,
		disableAutoPan: false,
		zIndex: null,
		boxStyle: { 
		  	background: '#333',
			border: '1px solid #8edcef',
			height: '122px',
			opacity: 1,
			width: '182px'
		},
		closeBoxMargin: '10px 2px 2px 2px',
		closeBoxURL: 'http://www.google.com/intl/en_us/mapfiles/close.gif',
		infoBoxClearance: new google.maps.Size(1, 1),
		isHidden: false,
		pane: "floatPane",
		enableEventPropagation: false
	});
	
	//open infowindow on click event on marker.
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(map, marker);
	});
	
	// attach marker
	marker.setMap(map);
}