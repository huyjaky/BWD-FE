
import { createHouseFormContext } from "@/contexts/createHouseForm";
import { house_ } from "@/models/house";
import { whenLoaded } from "bing-maps-loader";
import { title } from "process";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";

interface MapEditProps {
  tempHouse: house_ | undefined;
  setTempHouse: (payload: house_) => void;
  keyMapBing: string;
}


const MapCreateHouse = ({ setTempHouse, tempHouse, keyMapBing }: MapEditProps) => {
  const { createHouseForm, setCreateHouseForm } = useContext(createHouseFormContext)
  useEffect(()=>{
    console.log('create', createHouseForm);
  }, [createHouseForm])

  useEffect(() => {
    whenLoaded.then(() => {
      const map_ = document.getElementById('MapEdit7');
      if (map_ && tempHouse) {
        const map = new Microsoft.Maps.Map(map_, {
          /* No need to set credentials if already passed in URL */
          center: new Microsoft.Maps.Location(tempHouse.address.latitude || 16.047079,
            tempHouse.address.longitude || 108.206230
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
            manager.attachAutosuggest('#searchBox7', '#searchBoxContainer7', (suggestionResult: any) => {
              map.entities.clear();
              map.setView({ bounds: suggestionResult.bestView });
              var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
              map.entities.push(pushpin);

              console.log(suggestionResult);
              if (createHouseForm) {
                setCreateHouseForm({
                  ...createHouseForm,
                  address: {
                    ...createHouseForm.address, ...suggestionResult?.address, ...suggestionResult?.location,
                    title: suggestionResult.title
                  }
                })
              }
            });
          }
        });
      }
    });
  }, [tempHouse?.address.formattedAddress]);

  return (
    <>
      <div className={`w-full rounded-3xl border-2 border-red-400 overflow-hidden h-[22rem]`}>
        <div id={"MapEdit7"} className="relative z-10"></div>
      </div>

      <div id="searchBoxContainer7" className="box-border px-5">
        <input
          placeholder={'Enter your house locale'}
          id="searchBox7" type="text" className="w-full h-[3rem] outline-none text-[2rem] mt-[3rem]
          border-b-2 border-slate-600
          " />
      </div>
    </>
  )
}

export default MapCreateHouse;