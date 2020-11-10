var camera = 1;
var image = document.getElementById('stream');

window.onload = function () {

  document.getElementById("Shoot1").addEventListener('click', function (e) {
    e.preventDefault();
    Control(camera, "5");
  });

  document.getElementById("Shoot1").addEventListener('click', function (e) {
    e.preventDefault();

  });

  document.getElementById("Up1").addEventListener('click', function (e) {
    e.preventDefault();
    Control(camera, "1");
  });

  document.getElementById("Down1").addEventListener('click', function (e) {
    e.preventDefault();
    Control(camera, "3");
  });

  document.getElementById("Left1").addEventListener('click', function (e) {
    e.preventDefault();
    Control(camera, "4");
  });

  document.getElementById("Right1").addEventListener('click', function (e) {
    e.preventDefault();
    Control(camera, "2");
  });

  this.document.getElementById("CAM1").addEventListener('click', function (e) {
    e.preventDefault();
    camera = 1;
    console.log(camera);
    image.src = "http://192.168.0.42:8091/?action=stream"
  });

  this.document.getElementById("CAM2").addEventListener('click', function (e) {
    e.preventDefault();
    location.href = 'slide1.html';
  });
}

function Control(num, action) {
  console.log(num);
  var state;

  var ae = "zone1";
  var cnt = "cam1";
  var cin = action;

  if (num == 1) {
    cnt = "cam1";
  } else {
    cnt = "cam2"; //추후 수정
  }
  if (action == 5) {
    setTimeout(function () {
      location.reload();
    }, 1000);
  }


  var addr = "http://192.168.0.6:7599/rosemary";
  var settings;

  state = 3;
  addr = addr + "/" + ae + "/" + cnt;
  settings = {
    "async": true,
    "crossDomain": true,
    "url": addr,
    "method": "POST",
    "headers": {
      "Accept": "application/json",
      "X-M2M-RI": "12345",
      "X-M2M-Origin": "SxBMnw8TT5b",
      "Content-Type": "application/json; ty=4",
    },
    "data": "{\n    \"m2m:cin\": {\n        \"con\": \"" + cin + "\" \n    }\n}"
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
