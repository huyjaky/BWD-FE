import { userAcc } from "@/models/userAcc";
import axiosClient from "./axiosClient";


export const userApi = {
  userInfor(payload: string, attr: string){
    return axiosClient.get(`/api/get/useracc/${attr}/${payload}`);
  }
}