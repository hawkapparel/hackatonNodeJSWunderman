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

(function () {
    var content = document.getElementById("app");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (objPosition) {
            var lon = objPosition.coords.longitude;
            var lat = objPosition.coords.latitude;

            var dir = "";
            var dpto = "";
            var latlng = new google.maps.LatLng(lat, lon);
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ "latLng": latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        console.log(results);
                        dir = "<p><strong>Dirección: </strong>" + results[0].formatted_address + "</p>";
                        dpto = "<p><strong>Departamento: </strong>" + results[0].address_components[3].long_name + "</p>";
                    }
                    else {
                        dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
                    }
                }
                else {
                    dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
                }

                content.innerHTML = "<p><strong>Latitud:</strong> " + lat + "</p><p><strong>Longitud:</strong> " + lon + "</p>" + dir + dpto;
            });
        }, function (objPositionError) {
                switch (objPositionError.code) {
                    case objPositionError.PERMISSION_DENIED:
                        content.innerHTML = "No se ha permitido el acceso a la posición del usuario.";
                        break;
                    case objPositionError.POSITION_UNAVAILABLE:
                        content.innerHTML = "No se ha podido acceder a la información de su posición.";
                        break;
                    case objPositionError.TIMEOUT:
                        content.innerHTML = "El servicio ha tardado demasiado tiempo en responder.";
                        break;
                    default:
                        content.innerHTML = "Error desconocido.";
                }
            }, {
                maximumAge: 75000,
                timeout: 15000
            });
    }
    else {
        content.innerHTML = "Su navegador no soporta la API de geolocalización.";
    }

    function initMap() {
      var uluru = {lat: -12.0973775, lng: -77.05774420000002};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: uluru
      });
      var infowindow = new google.maps.InfoWindow({
        content: "<h5>Contenido Estático</h5>"
      });
      var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          title: 'Uluru'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
    }
    initMap();

})();


