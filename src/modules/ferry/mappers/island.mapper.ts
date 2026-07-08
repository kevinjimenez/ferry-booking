import type { SelectOption } from '@/shared/components/ui/BaseSelect.vue';
import type { IslandResponse } from '../types/api/responses/island-response.types';

export class IslandMapper {
  static toIslandOption = (island: IslandResponse): SelectOption => ({
    // id: port.id,
    label: island.name,
    value: island.id,
    extra: {
      code: island.code,
      description: island.description,
    },
  });
}
