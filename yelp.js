var map;
var markersArray = [];

function initialize(){
  map = new google.maps.Map(top.window.right.document.getElementById('mymap'), {
    center: {lat: 32.75, lng: -97.13},
    zoom: 16
  });
}

function show(){
 var getbounds = map.getBounds();
 ne = getbounds.getNorthEast(); // LatLng of the north-east corner
 sw = getbounds.getSouthWest(); // LatLng of the south-west corder

 sendRequest(sw.lat(),sw.lng(),ne.lat(),ne.lng());
 /*
 google.maps.event.addListener(map, "bounds_changed", function()*/
 }



function sendRequest (swlat,swlng,nelat,nelng) {
    this.swlat=swlat;
    this.swlng=swlng;
    this.nelat=nelat;
    this.nelng=nelng;
    deleteMarkers();
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("search").value);
   xhr.open("GET", "proxy.php?term="+query+"&bounds="+swlat+","+swlng+"|"+nelat+","+nelng+"&limit=10");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          document.getElementById("output").innerHTML="";
          if(json.total==0){
            document.getElementById("output").innerHTML+="</br>! No results found in this area. Try repositioning the map.";
          }

          var table=document.createElement("table");
          table.setAttribute('border','0');
          table.setAttribute('width','90%');

          document.getElementById("output").appendChild(table);
          for(var loop=0;loop<10;loop++){
            var tr=document.createElement("tr");
            table.appendChild(tr);
            var td=document.createElement("td");
            td.setAttribute("bgcolor","#F7F7F7");
            td.innerHTML="<img src='"+json.businesses[loop].image_url+"'>";
            tr.appendChild(td);
            var td1=document.createElement("td");
            td1.setAttribute("bgcolor","#F7F7F7");
            td1.innerHTML="<font size=5px>"+(loop+1)+") ";
            td1.innerHTML+="<font size=5px><a href='"+json.businesses[loop].url+"' text-decoration='none' target='_blank'>"+json.businesses[loop].name + "</a></font>&nbsp;&nbsp;";
            td1.innerHTML+="&nbsp;&nbsp;<img src='"+json.businesses[loop].rating_img_url+"'></br>";
            td1.innerHTML+="<font color=#292F33><i>"+json.businesses[loop].snippet_text+"</i></font>";
            tr.appendChild(td1);
            var number= String(loop+1);
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(json.businesses[loop].location.coordinate.latitude,json.businesses[loop].location.coordinate.longitude),
              map: map,
              label: number,
              title: json.businesses[loop].name
            });
            markersArray.push(marker);
          }
      }
   };
   xhr.send(null);
}

function deleteMarkers() {

        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray = [];
    };
