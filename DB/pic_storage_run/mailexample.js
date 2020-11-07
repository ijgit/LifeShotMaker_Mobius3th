var user = "lifeshot.maker@gmail.com"

var settings = {
    "async": true,
    "crossDomain": true,
    "url": addr,
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    },
    "data": "{" + user + "}"
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
