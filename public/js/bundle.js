
(function () {
    var content = document.getElementById("app");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (objPosition) {
            var lon = objPosition.coords.longitude;
            var lat = objPosition.coords.latitude;
  var app = new Vue({
    el: '#vueMap',
    data: {
      locations: [
        {
          nombre: 'Bondi Beach',
          latitud: '-33.890542',
          longitud: '151.274856'
        },
        {
          nombre:'Coogee Beach',
          latitud:'-33.923036',
          longitud:'151.259052'
        }
      ]
    },
    mounted: function(){
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-33.92, 151.25)
      });
      var infowindow = new google.maps.InfoWindow();
      var marker = [];
      var i;

      for (i = 0; i < this.locations.length; i++) {
        console.log(this.locations[i].nombre);
        var objMarker = new google.maps.Marker({
          position: new google.maps.LatLng(this.locations[i].latitud, this.locations[i].longitud),
          map: map,
          title: this.locations[i].nombre
        });
        marker[i].addListener('click', function() {
          infowindow.setContent('asdas');
          infowindow.open(map, marker[i]);
        });
        marker.push(objMarker);
      }
      console.log(marker);

    }
    initMap();

})();

 $('form').submit(function(event) {

        var formData = {
            'name'              : $('input[name=iname]').val(),
            'email'             : $('input[name=email]').val(),
            'genre'             : $('input[name=genre]').val(),
            'cx'                : $('input[name=cx]').val(),
            'cy'                : $('input[name=cy]').val()
        };
        $.ajax({
            type        : 'POST',
            url         : 'http://localhost:3000/api/clients', 
            data        : formData, 
            dataType    : 'json', 
            encode          : true
        }).done(function(data) {
            console.log(data); 
        });
        event.preventDefault();
    });

$("#look").click(function(){
    var request = new XMLHttpRequest();
    var nombre = document.getElementById("iname",).value;
    request.open('GET', 'http://localhost:3000/api/clients/name/'+nombre, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var resp = request.responseText;
        console.log(resp)
        document.getElementById("datos").innerHTML  = resp;
      } else {
        document.getElementById("datos").innerHTML  = "Datos no encontrados";

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
       document.getElementById("datos").innerHTML  = "Datos no encontrados";
    };

    request.send();


});