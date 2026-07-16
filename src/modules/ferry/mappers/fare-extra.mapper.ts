import { markRaw } from 'vue';
import BoxIcon from '@/shared/icons/BoxIcon.vue';
import type { FareExtraResponse } from '../types/api/responses/fare-extra-response.types';
import type { FareExtra } from '../types/fare-extra.types';

export class FareExtraMapper {
  static toFareExtraOption = (fareExtra: FareExtraResponse): FareExtra => ({
    id: fareExtra.id,
    icon: markRaw(BoxIcon),
    title: fareExtra.name,
    subtitle: fareExtra.description,
    price: Number(fareExtra.price),
    items: fareExtra.features.filter(item => item.included).map(item => item.text),
  });
}
