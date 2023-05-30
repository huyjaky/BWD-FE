import { motion } from 'framer-motion';
import Map, { NavigationControl, Marker } from 'react-map-gl';
import { ImLocation2 } from 'react-icons/im';
import { useState } from 'react';

interface MapBoxProps {
  longitude: number | undefined;
  latitude: number | undefined;
  keyMapBox: string | undefined;
}

const MapBox = ({ longitude, latitude, keyMapBox }: MapBoxProps) => {
  const [viewPort, setViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    keyMapBox: keyMapBox
  });

  return (
    <div className="w-full h-fit mt-10 border-t-2 border-slate-800 mb-10">
      <div className="w-full mb-5 mt-5">
        <span className="text-[30px]">Where you will be</span>
      </div>
      <motion.div
        whileInView={{ y: [40, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="w-full h-fit"
      >
        <Map
          style={{
            width: '100%',
            height: '400px',
            borderRadius: '20px',
            border: '3px solid red'
          }}
          scrollZoom={false}
          initialViewState={{
            longitude: viewPort.longitude,
            latitude: viewPort.latitude,
            zoom: 15
          }}
          mapboxAccessToken={keyMapBox}
          mapStyle={'mapbox://styles/jajajajau/cli2mlj4702e201r0gwyg2dun'}
        >
          <NavigationControl showCompass={true} />
          <Marker latitude={viewPort.latitude} longitude={viewPort.longitude} offset={[-8, -70]}>
            <motion.div
              animate={{ scale: [1, 1.2] }}
              transition={{ repeat: Infinity, type: 'spring', duration: 1 }}
              className=""
            >
              <ImLocation2 className="text-[40px] text-red-500" />
            </motion.div>
          </Marker>
        </Map>
      </motion.div>
    </div>
  );
};
export default MapBox;
