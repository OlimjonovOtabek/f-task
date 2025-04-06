import { Injectable } from '@angular/core';
import { Correspondent, DeliveryMethod } from '../enums';
import { DataOption } from '../models/data-option';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  getCorrespondents(): DataOption<Correspondent>[] {
    return [
      { text: 'CB', value: Correspondent.CB },
      { text: 'GNI', value: Correspondent.GNI },
      { text: 'HOA', value: Correspondent.HOA },
    ];
  }

  getDeliveryMethods(): DataOption<DeliveryMethod>[] {
    return [
      { text: 'Email', value: DeliveryMethod.Email },
      { text: 'Courier', value: DeliveryMethod.Courier },
      { text: 'PhoneCall', value: DeliveryMethod.PhoneCall },
    ];
  }
}
