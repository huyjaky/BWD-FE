import { motion } from 'framer-motion';
import Map, { NavigationControl, Marker } from 'react-map-gl';
import { ImLocation2 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { whenLoaded } from 'bing-maps-loader';
interface MapBoxProps {
  longitude: number | undefined;
  latitude: number | undefined;
  keyMapBing: string;
}

const MapBox = ({ longitude, latitude, keyMapBing }: MapBoxProps) => {
  const [viewPort, setViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    keyMapBing: keyMapBing
  });
  useEffect(() => {
    whenLoaded.then(() => {
      const map_ = document.getElementById('Map');
      if (map_) {
        var map = new Microsoft.Maps.Map(map_, {
          /* No need to set credentials if already passed in URL */
          center: new Microsoft.Maps.Location(latitude, longitude),
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: 18,
          credentials: keyMapBing,
          disableScrollWheelZoom: true
        });
        var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), undefined);
        var layer = new Microsoft.Maps.Layer();
        layer.add(pushpin);
        map.layers.insert(layer);
      }
    });

  }, [latitude, longitude])

  return (
    <div className="w-full h-fit mt-10 border-t-2 border-slate-800 mb-10">
      <div className="w-full mb-5 mt-5">
        <span className="text-[2rem]">Where you will be</span>
      </div>
      <motion.div
        whileInView={{ y: [40, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="w-full h-fit"
      >
        <div className="w-full h-[32rem] rounded-3xl border-2 border-red-400 overflow-hidden">
          <div id="Map"></div>
        </div>
      </motion.div>
    </div>
  );
};
export default MapBox;
