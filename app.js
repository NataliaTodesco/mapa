$(document).ready(function () {
    $("#mapContainer").hide();

    $("#btn2").click(function () {
      $('.img-fluid').remove();
      $("#mapContainer").show();

        $.ajax({
            url: "https://localhost:5001/Coordenada/GetConPunto",
            type: "GET",
              success: function(result) {
                if (result.ok){
                  swal("Consulta Exitosa", "", "success");
                  Mapa(result.return.latitud,result.return.longitud);
                }
                else {
                  swal(result.error);
                }
              },
              error: function(error) {
                console.log(error);
                swal("Consulta Fallida", "", "error");
                Mapa(-31.44233, -64.19324);
              }
        });
    })
  });

  function Mapa(latitud, longitud){
    var platform = new H.service.Platform({
      apikey: 'lS8n-1W1aNNPkuOLgrG-T52mTkj48D-Q850-PH6OJ90'
    });
    var defaultLayers = platform.createDefaultLayers();
    var latd = latitud;
    var long =longitud;
    var map = new H.Map(document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map,
        {
            center: { lat: latd, lng: long},
            zoom: 12,
            pixelRatio: window.devicePixelRatio || 1
        }
    );
    window.addEventListener('resize', () => map.getViewPort().resize());
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    var ui = H.ui.UI.createDefault(map, defaultLayers);
    
    var LocationOfMarker = { lat: latd, lng: long };
    var icon = new H.map.Icon('https://img.icons8.com/fluent/60/4a90e2/place-marker.png');
    var marker = new H.map.Marker(LocationOfMarker, { icon: icon });
    map.addObject(marker);
    map.setCenter(LocationOfMarker);

    addIml(map);
  }

  function addIml(map) {
    const catalogHrn = 'hrn:here:data::olp-here:dh-showcase-dc-transit';
    const layerId = 'dc-transit';
    const service = platform.getIMLService();
    const imlProvider = new H.service.iml.Provider(service, catalogHrn, layerId);
    const style = imlProvider.getStyle();
    const styleConfig = style.extractConfig(['iml']);
    styleConfig.layers.iml.lines.draw.lines.dash = [1, 1];
    styleConfig.layers.iml.lines.draw.lines.width = [[5, 5000], [8, 800], [10, 200], [12, 160], [14, 60], [18, 20]];
    style.mergeConfig(styleConfig);

    map.addLayer(new H.map.layer.TileLayer(imlProvider));
}

/////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    $("#latitud").click(function () {
      $.ajax({
            url: "https://localhost:5001/Coordenada/GetConPunto",
            type: "GET",
              success: function(result) {
                  swal("Latitud API: ",result.return.latitud);
              },
              error: function(error) {
                swal("Latitud UTN FRC: ", "-31.44233");
              }
      });
    });
    $("#longitud").click(function () {
      $.ajax({
            url: "https://localhost:5001/Coordenada/GetConPunto",
            type: "GET",
              success: function(result) {
                  swal("Longitud API: ",result.return.longitud);
              },
              error: function(error) {
                swal("Longitud UTN FRC: ", "-64.19324");
              }
      });
    });
    $("#ubicacion").click(function () {
      $.ajax({
            url: "https://localhost:5001/Coordenada/GetConPunto",
            type: "GET",
              success: function(result) {
                var options = {
                  enableHighAccuracy: true,
                  timeout: 6000,
                  maximumAge: 0
                };
                
                navigator.geolocation.getCurrentPosition( success, error, options );
                
                function success(position) {
                  var coordenadas = position.coords;
                
                  swal('Tu posición actual es:','Latitud : ' + coordenadas.latitude +'\nLongitud: ' + coordenadas.longitude);
                };
                
                function error(error) {
                  console.warn('ERROR(' + error.code + '): ' + error.message);
                };
              },
              error: function(error) {
                swal("Ubicación: ", "UTN FRC");
              }
      });
    });
  })