import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ImLocation2 } from 'react-icons/im';
import { Map, Marker, NavigationControl } from 'react-map-gl';

interface MapEachProps {
  longitude: number;
  latitude: number;
  zoom: number;
  keyMapBing: string;
}

const MapEach = ({ latitude, longitude, zoom, keyMapBing }: MapEachProps) => {
  const [viewPort, setViewPort] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  }>({
    longitude: longitude,
    latitude: latitude,
    zoom: zoom
  });

  useEffect(() => {
    const map_ = document.getElementById('MapEach');
    if (map_) {
      var map = new Microsoft.Maps.Map(
        map_,
        {
          /* No need to set credentials if already passed in URL */
          center: new Microsoft.Maps.Location(latitude, longitude),
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: zoom,
          credentials: keyMapBing
        }
      );
      var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), undefined);
      var layer = new Microsoft.Maps.Layer();
      layer.add(pushpin);
      map.layers.insert(layer);
    }
  }, [latitude, longitude, zoom]);

  return (
    <div className='w-full h-[500px] rounded-3xl border-2 border-red-400 overflow-hidden'>
      <div id='MapEach'></div>
    </div>
  );
};

export default MapEach;
