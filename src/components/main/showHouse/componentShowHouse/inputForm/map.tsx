import { house_ } from "@/models/house";
import { whenLoaded } from "bing-maps-loader";
import { Dispatch, SetStateAction, useEffect } from "react";

interface MapEditProps {
  tempHouse: house_ | undefined;
  setTempHouse: Dispatch<SetStateAction<house_ | undefined>>;
  keyMapBing: string
}


const MapEdit = ({ setTempHouse, tempHouse, keyMapBing }: MapEditProps) => {

  useEffect(() => {
    whenLoaded.then(() => {
      const map_ = document.getElementById('MapEdit');
      if (map_ && tempHouse) {
        const map = new Microsoft.Maps.Map(map_, {
          /* No need to set credentials if already passed in URL */
          center: new Microsoft.Maps.Location(tempHouse.address.latitude,
            tempHouse.address.longitude
          ),
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: 16,
          credentials: keyMapBing
        });
        var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), undefined);
        var layer = new Microsoft.Maps.Layer();
        layer.add(pushpin);
        map.layers.insert(layer);


        Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
          callback: () => {
            var options = { maxResults: 5, businessSuggestions: true };
            var manager = new Microsoft.Maps.AutosuggestManager(options);
            manager.attachAutosuggest('#searchBox2', '#searchBoxContainer2', (suggestionResult: any) => {
              map.entities.clear();

              map.setView({ bounds: suggestionResult.bestView });
              var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
              map.entities.push(pushpin);
            });
          }
        });
      }
    });
  }, [tempHouse]);

  return (
    <>
      <div className={`w-full rounded-3xl border-2 border-red-400 overflow-hidden h-[350px]`}>
        <div id={"MapEdit"} className="relative z-10"></div>
      </div>

      <div id="searchBoxContainer2">
        <input
          id="searchBox2" type="text" className="w-full h-[50px] outline-none text-[25px]" />
      </div>
    </>
  )
}

export default MapEdit;