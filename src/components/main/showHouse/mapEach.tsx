
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ImLocation2 } from 'react-icons/im';
import { Map, Marker, NavigationControl } from 'react-map-gl';

interface MapEachProps {
  longitude: number,
  latitude: number,
  zoom: number,
  keyMapBox: string
}



const MapEach = ({ latitude, longitude, zoom, keyMapBox }: MapEachProps) => {
  const [viewPort, setViewPort] = useState<{
    longitude: number,
    latitude: number,
    zoom: number,
  }>({
    longitude: longitude,
    latitude: latitude,
    zoom: zoom
  })

  useEffect(() => {
    setViewPort(prevViewport => ({
      ...prevViewport,
      ...{ longitude: longitude, latitude: latitude, zoom: zoom }
    }));
  }, [latitude, longitude, zoom])


  return (
    <Map style={{
      width: '100%',
      height: '400px',
      borderRadius: '20px',
      border: '3px solid red',
    }}
      {...viewPort} // cai nay de xac dinh vi tri khi thay doi latitude va longitude
      scrollZoom={false}
      onMove={event => setViewPort(event.viewState)} // cho phep nguoi dung co the keo tha
      mapStyle={'mapbox://styles/jajajajau/cli2mlj4702e201r0gwyg2dun'}
      mapboxAccessToken={keyMapBox}
    >
      <NavigationControl showCompass={true} />
      <Marker latitude={latitude} longitude={longitude}
      anchor='center' scale={viewPort.zoom} >
        <motion.div
          animate={{ scale: [1, 1.2] }}
          transition={{ repeat: Infinity, type: 'spring', duration: 1 }}
          className="block"
        >
          <ImLocation2 className="text-[40px] text-red-500" />
        </motion.div>
      </Marker>
    </Map>
  )
}

export default MapEach;
