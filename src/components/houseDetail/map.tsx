import { motion } from "framer-motion";
import Map, { NavigationControl, Marker } from 'react-map-gl';
import {ImLocation2} from 'react-icons/im'


interface MapBoxProps {
  longitude: number,
  latitude: number,
  keyMapBox: string
}


const MapBox = ({longitude, latitude, keyMapBox}: MapBoxProps) => (
  <div className="w-full h-fit mt-10 border-t-2 border-slate-800 mb-10 relative z-10">
    <div className="w-full mb-5 mt-5">
      <span className="text-[30px]">Where you will be</span>
    </div>
    <motion.div
      whileInView={{ y: [40, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="w-full h-fit relative z-0">
      <Map
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '20px',
          border: '3px solid red',
          position: 'relative'
        }}
        scrollZoom={false}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 15
        }}
        mapStyle={'mapbox://styles/jajajajau/cli2mlj4702e201r0gwyg2dun'}
        mapboxAccessToken={keyMapBox}

        >
        <NavigationControl showCompass={true} />
        <Marker
        latitude={latitude}
        longitude={longitude}
        offset={[-8, -70]}
        >
          <motion.div
          animate={{scale: [1, 1.2]}}
          transition={{repeat: Infinity, type: 'spring', duration: 1}}
          className="">
            <ImLocation2 className="text-[40px] text-red-500"/>
          </motion.div>
        </Marker>

      </Map>
    </motion.div>
  </div>
);
export default MapBox;
