Vue.use(VueGoogleMaps, {
 load: {
   key: 'AIzaSyCpSOEXuBwSjiCQfMseWutCpPrsoSAfg9g'
 },
});
document.addEventListener('DOMContentLoaded', function() {
 new Vue({
   el: '#vueMap',
   data: {
     nameSearch: '',
     center: {
       lat: 47.376332,
       lng: 8.547511
     },
     infoContent: '',
     infoWindowPos: {
       lat: 0,
       lng: 0
     },
     infoWinOpen: false,
     currentMidx: null,
     //optional: offset infowindow so it visually sits nicely on top of our marker
     infoOptions: {
       pixelOffset: {
         width: 0,
         height: -35
       }
     },
     markers: []
   },
   updated: function() {
     console.log("asdasd");
   },
   methods: {
     consultarApi: function(){
       var bounds = new google.maps.LatLngBounds();
       this.$http.get('http://localhost:3000/api/clients/name/'+this.nameSearch)
           .then(function(response) {
             this.markers = response.body;
             console.log(response);
           });
     },
     toggleInfoWindow: function(marker, idx) {
       this.infoWindowPos = marker.position;
       this.infoContent = marker.infoText;
       //check if its the same marker that was selected if yes toggle
       if (this.currentMidx == idx) {
         this.infoWinOpen = !this.infoWinOpen;
       }
       //if different marker set infowindow to open and reset current marker index
       else {
         this.infoWinOpen = true;
         this.currentMidx = idx;
       }
     }
   }
 });
});
