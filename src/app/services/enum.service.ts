import { Injectable } from '@angular/core';
import { Correspondent, DeliveryMethod } from '../enums';
import { DataOption } from '../models/data-option';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  getCorrespondents(): DataOption<Correspondent>[] {
    return [
      { label: 'CB', value: Correspondent.CB },
      { label: 'GNI', value: Correspondent.GNI },
      { label: 'HOA', value: Correspondent.HOA },
    ];
  }

  getDeliveryMethods(): DataOption<DeliveryMethod>[] {
    return [
      { label: 'Email', value: DeliveryMethod.Email },
      { label: 'Courier', value: DeliveryMethod.Courier },
      { label: 'PhoneCall', value: DeliveryMethod.PhoneCall },
    ];
  }
}
