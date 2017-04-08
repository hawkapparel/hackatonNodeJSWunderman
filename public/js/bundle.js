// var locations = [
//     ['Bondi Beach', -33.890542, 151.274856, 4],
//     ['Coogee Beach', -33.923036, 151.259052, 5],
//     ['Cronulla Beach', -34.028249, 151.157507, 3],
//     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//     ['Maroubra Beach', -33.950198, 151.259302, 1]
//   ];

  // var map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 10,
  //   center: new google.maps.LatLng(-33.92, 151.25)
  //   // mapTypeId: google.maps.MapTypeId.ROADMAP
  // });
  //
  // var infowindow = new google.maps.InfoWindow();
  //
  // var marker, i;
  //
  // for (i = 0; i < locations.length; i++) {
  //   marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
  //     map: map
  //   });
  //
  //   google.maps.event.addListener(marker, 'click', (function(marker, i) {
  //     return function() {
  //       infowindow.setContent(locations[i][0]);
  //       infowindow.open(map, marker);
  //     }
  //   })(marker, i));
  // }

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
  })
