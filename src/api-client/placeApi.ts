import { address } from "@/models/address";
import axiosClient from "./axiosClient";

interface addressProps {
  address: string
}

export const placeApi = {
  searchPlace(payload: addressProps) {
    return axiosClient.post('/searchplace', payload);
  },
  searchLocation(payload:address) {
    return axiosClient.post('/searchlocation', payload)
  }
};
