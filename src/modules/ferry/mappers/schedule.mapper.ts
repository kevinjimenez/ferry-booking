import type { ScheduleResponse } from '@/modules/ferry/types/api/responses/schedule-response.types.ts';
import { formatDuration, formatTime } from '@/shared/utils/date.utils.ts';
import dayjs from 'dayjs';
import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';

export class ScheduleMapper {
  static toFerry = (schedule: ScheduleResponse): Ferry => {
    return {
      id: schedule.id,
      origin: {
        time: formatTime(schedule.departure_time), // '09:30',
        port: `${schedule.routes.origin_islands.name} (${schedule.routes.origin_islands.code})`, // store
        island: schedule.routes.origin_islands.code, // store
        address: schedule.routes.origin_islands.description, // strore
      },
      destination: {
        time: formatTime(schedule.arrival_time), // '09:30',
        port: `${schedule.routes.destination_islands.name} (${schedule.routes.destination_islands.code})`, // store
        island: schedule.routes.destination_islands.code, // store
        address: schedule.routes.destination_islands.description, // strore
      },
      duration: `~${formatDuration(schedule.departure_time, schedule.arrival_time)}`, // departure - arrive | ~2h 30min
      price: Number(schedule.routes.base_price),
      currency: 'USD',
      seats: schedule.available_seats,
      durationMinutes: dayjs(schedule.arrival_time).diff(dayjs(schedule.departure_time), 'minute'),
      ferry: {
        name: schedule.ferries.name,
        type: schedule.ferries.type,
        amenities: schedule.ferries.amenities,
      },
    };
  };
}
