// get/schedule/host

import axiosClient from "./axiosClient";
import { scheduleCreate } from "./schedule";

export const ScheduleApi = {
  scheduleHost(HostId: string) {
    return axiosClient.post('/get/schedule/host', { HostId: HostId });
  },
  scheduleHostModifier(HostId: string, event: Date) {
    return axiosClient.post('/modifier/schedule/host', { HostId: HostId, data: event });
  },
  EditTitleHost(HostId: string, event: string) {
    return axiosClient.post('/edit/title/schedule/host', { HostId: HostId, data: event });
  },
  scheduleHostDelete(HostId: string) {
    return axiosClient.post('/delete/scheduel/host', { HostId: HostId });
  },
};