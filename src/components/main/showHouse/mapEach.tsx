import { whenLoaded } from 'bing-maps-loader';
import { useEffect, useState } from 'react';
interface MapEachProps {
  longitude: number;
  latitude: number;
  zoom: number;
  keyMapBing: string;
}

const MapEach = ({ latitude, longitude, zoom, keyMapBing }: MapEachProps) => {
  useEffect(() => {

    whenLoaded.then(() => {
      const map_ = document.getElementById('MapEach');
      if (map_) {
        var map = new Microsoft.Maps.Map(map_, {
          /* No need to set credentials if already passed in URL */
          center: new Microsoft.Maps.Location(latitude, longitude),
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: zoom,
          credentials: keyMapBing
        });
        var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), undefined);
        var layer = new Microsoft.Maps.Layer();
        layer.add(pushpin);
        map.layers.insert(layer);
      }
    });
  }, [latitude, longitude, zoom])

  return (
    <div className="w-full h-[500px] rounded-3xl border-2 border-red-400 overflow-hidden">
      <div id="MapEach" className="relative z-10"></div>
    </div>
  );
};

export default MapEach;
