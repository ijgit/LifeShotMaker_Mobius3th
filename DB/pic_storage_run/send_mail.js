function sendEmail(){
    var addr = "192.168.0.11:1237/mail";
    var user = "lifeshot.maker@gmail.com";
    var settings;


    settings = {
        "async": true,
        "crossDomain": true,
        "url": addr,
        "method": "POST",
        "headers": {
            "Accept": "application/json"
        },
        "data": "{\n    \"m2m:cin\": {\n        \"con\": \"" + cin + "\" \n    }\n}"
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}