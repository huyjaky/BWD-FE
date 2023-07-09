
import { house_ } from "@/models/house";
import { whenLoaded } from "bing-maps-loader";
import { title } from "process";
import { Dispatch, SetStateAction, useEffect } from "react";

interface MapEditProps {
  tempHouse: house_ | undefined;
  setTempHouse: Dispatch<SetStateAction<house_ | undefined>>;
  keyMapBing: string;
  value: string
}


const MapCreateHouse = ({ setTempHouse, tempHouse, keyMapBing, value }: MapEditProps) => {

  useEffect(() => {
    whenLoaded.then(() => {
      const map_ = document.getElementById('mapCreateHouse');
      if (map_ && tempHouse) {
        const map = new Microsoft.Maps.Map(map_, {
          /* No need to set credentials if already passed in URL */
          center: new Microsoft.Maps.Location(tempHouse.address.latitude || 16.047079,
            tempHouse.address.longitude || 	108.206230
          ),
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: 16,
          credentials: keyMapBing,
          disableScrollWheelZoom: true
        });
        var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), undefined);
        var layer = new Microsoft.Maps.Layer();
        layer.add(pushpin);
        map.layers.insert(layer);


        Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
          callback: () => {
            var options = { maxResults: 5, businessSuggestions: true };
            var manager = new Microsoft.Maps.AutosuggestManager(options);
            manager.attachAutosuggest('#searchBoxCreateHouse', '#searchBoxContainerCreateHouse', (suggestionResult: any) => {
              map.entities.clear();
              map.setView({ bounds: suggestionResult.bestView });
              var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
              map.entities.push(pushpin);

              setTempHouse({...tempHouse,
                address: {...tempHouse.address, ...suggestionResult?.address, ...suggestionResult?.location,
                  title: suggestionResult.title
                }})
            });
          }
        });
      }
    });
  }, [tempHouse?.address.formattedAddress]);

  return (
    <>
      <div className={`w-full rounded-3xl border-2 border-red-400 overflow-hidden h-[22rem]`}>
        <div id={"mapCreateHouse"} className="relative z-10"></div>
      </div>

      <div id="searchBoxContainerCreateHouse">
        <input
          placeholder='Search your'
          id="searchBoxCreateHouse" type="text" className="w-full h-[3rem] outline-none text-[2rem]" />
      </div>
    </>
  )
}

export default MapCreateHouse;