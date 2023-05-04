import axiosClient from "./axiosClient";

interface addressProps {
  address: string
}

export const placeApi = {
  searchPlace(payload: addressProps) {
    return axiosClient.post('/searchplace', payload);
  }
};
