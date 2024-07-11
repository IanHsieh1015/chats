// 在 MapContainer.js 中使用 TGOS 地圖服務搜尋附近停車場
import { useEffect } from 'react'

const MapContainer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://api.tgos.tw/TGOS_API/tgos?version=2&download=false&apikey=YOUR_API_KEY`;
    script.async = true;
    script.onload = () => {
      const map = new TGOS.TGOnlineMap(document.getElementById('map'), {
        markerTitle: 'TGOS Map',
        zoom: 13,
        center: new TGOS.TGPoint(25.0391667, 121.525)
      });

      // 使用 TGOS 地圖搜尋服務來顯示附近的停車場
      const service = new TGOS.TGBroadcasterService();
      service.addEventListener(TGOS.TGEvent.READY, () => {
        const request = new TGOS.TGFindBroadcasterNearbyRequest();
        request.setCoordinate(25.0391667, 121.525);
        request.setKeywords(['停車場']);
        request.setSearchRadius(1000); // 搜尋半徑，單位公尺
        request.send((response) => {
          if (response) {
            const results = response.getResults();
            results.forEach(result => {
              const position = result.getLatLng();
              const marker = new TGOS.TGMarker({
                position: position,
                map: map,
                title: result.getName()
              });
              const infoWindow = new TGOS.TGInfoWindow({
                position: position,
                content: result.getName()
              });
              marker.addEventListener(TGOS.TGEvent.CLICK, () => {
                infoWindow.open(map);
              });
            });
          }
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}></div>
  );
};

export default MapContainer;
