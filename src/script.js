// Not particularly necessary, but converts the latitude and logitude into a real address

var geocoder;

google.maps.event.addDomListener(window, 'load', function(){
    geocoder = new google.maps.Geocoder();
});

window.addEventListener('message', function(e){
    var data = e.data,
        lat = data.latitude,
        long = data.longitude,
        date = new Date(),
        latlng = new google.maps.LatLng(data.latitude, data.longitude);

    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if(status === 'OK'){
            e.source.postMessage({
                real_address: results[0].formatted_address || null,
                latitude: lat,
                longitude: long,
                time: date.toLocaleTimeString()
            }, e.origin);
        }
    });
}, false);

