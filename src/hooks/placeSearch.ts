import { placeApi } from '@/api-client';
import { address, addressProps } from '@/models/address';

const placeSearch = () => {
  const placeSearch_ = async ({ address }: addressProps) => {
    try {
      const placeList_ = await placeApi.searchPlace({ address: address });
      if (placeList_?.data?.statusCode == 200) {
        return placeList_.data.resourceSets[0].resources[0].value;
      }
      return undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const locationSearch_ = async (address: address) => {
    try {
      const located_ = await placeApi.searchLocation(address);
      if (located_?.data?.statusCode == 200) {
        const latitude = located_.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
        const longitude =
          located_.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
        return { latitude, longitude };
      }
      return undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
  return {
    placeSearch_,
    locationSearch_
  };
};

export default placeSearch;
