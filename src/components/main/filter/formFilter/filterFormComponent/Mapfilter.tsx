import { filterContext } from "@/contexts/filter";
import { selectPlaceContext } from "@/contexts/selectPlace";
import { whenLoaded } from "bing-maps-loader";
import { title } from "process";
import { useContext, useEffect } from "react";

interface MapFilterProps {
  keyMapBing: string
}

const MapFilter = ({ keyMapBing }: MapFilterProps) => {
  const { address, setAddress } = useContext(selectPlaceContext);
  const { filterForm, setFilterForm } = useContext(filterContext);
  useEffect(() => {
    whenLoaded.then(() => {
      const map_ = document.getElementById('Mapfilter');
      if (map_) {
        const map = new Microsoft.Maps.Map(map_, {
          /* No need to set credentials if already passed in URL */
          center: new Microsoft.Maps.Location(16.047079,
            108.206230
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
            manager.attachAutosuggest('#searchBox9', '#searchBoxContainer9', (suggestionResult: any) => {
              map.entities.clear();
              map.setView({ bounds: suggestionResult.bestView });
              var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
              map.entities.push(pushpin);

              console.log(suggestionResult);
              const addressSuggest = suggestionResult?.address
              const locationSuggest = suggestionResult?.location
              setAddress({
                ...address,
                address: {
                  addressLine: addressSuggest.addressLine + '',
                  adminDistrict: addressSuggest.adminDistrict + '',
                  countryRegion: addressSuggest.countryRegion + '',
                  countryRegionISO2: addressSuggest.countryRegionISO2 + '',
                  district:  addressSuggest.district + '',
                  formattedAddress: addressSuggest.formattedAddress + '',
                  locality: addressSuggest.locality + '',
                  postalCode: addressSuggest.postalCode + '',
                  latitude: locationSuggest.latitude ,
                  longitude: locationSuggest.longitude,
                  title: suggestionResult?.title + '',
                  streetName: ''
                }
              });

            });
          }
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-[28rem]">
      <div className={`w-full absolute top-0 left-0 rounded-3xl border-2 border-red-400
      overflow-hidden h-[21.875rem]

      `}>
        <div id={"Mapfilter"} className="relative z-10"></div>
      </div>

      <div id="searchBoxContainer9" className="border-b-2  absolute top-[21.875rem] mt-5 left-0 w-full ">
        <input
          placeholder={'Search location'}
          id="searchBox9" type="text" className="w-full h-[3rem] outline-none text-[2rem]" />
      </div>
    </div>
  )
}

export default MapFilter;