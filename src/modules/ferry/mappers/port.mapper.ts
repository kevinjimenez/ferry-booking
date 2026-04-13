import type { PortResponse } from '@/modules/ferry/types';
import type { SelectOption } from '@/shared/components/base/BaseSelect.vue';

export class PortMapper {
  static toPortOption = (port: PortResponse): SelectOption => ({
    // id: port.id,
    label: port.name,
    value: port.id,
    extra: port.islands,
  });
}
