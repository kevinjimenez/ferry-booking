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
        port: `${schedule.routes.origin_ports.name} (${schedule.routes.origin_ports.code})`, // store
        island: schedule.routes.origin_ports.islands.name, // store
        address: schedule.routes.origin_ports.address, // strore
      },
      destination: {
        time: formatTime(schedule.arrival_time), // '09:30',
        port: `${schedule.routes.destination_ports.name} (${schedule.routes.destination_ports.code})`, // store
        island: schedule.routes.destination_ports.islands.name, // store
        address: schedule.routes.destination_ports.address, // strore
      },
      duration: `~${formatDuration(schedule.departure_time, schedule.arrival_time)}`, // departure - arrive | ~2h 30min
      price: Number(schedule.routes.base_price_national),
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
