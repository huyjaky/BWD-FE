// get/schedule/host

import axiosClient from "./axiosClient";
import { scheduleCreate } from "./schedule";

export const ScheduleApi = {
  scheduleHost(HostId: string) {
    return axiosClient.post('/get/schedule/host', { HostId: HostId });
  },
  scheduleHostModifier(EventId: string, event: any) {
    return axiosClient.post('/modifier/schedule/host', { EventId: EventId, data: event });
  },
  scheduleHostDelete(EventId: string) {
    return axiosClient.post('/delete/scheduel/host', { EventId: EventId });
  },
};