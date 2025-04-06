import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Button } from 'primeng/button';
import { Calendar } from 'primeng/calendar';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Correspondent, DeliveryMethod } from '../../../enums';

@Component({
  selector: 'app-document-registration-form',
  imports: [Dialog, Button, InputTextModule, Calendar],
  templateUrl: './document-registration-form.component.html',
  styleUrl: './document-registration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentRegistrationFormComponent {
  visible = input(false);

  constructor(private fb: FormBuilder) {}

  formGroup = this.fb.nonNullable.group({
    access: this.fb.control<boolean>(false),
    control: this.fb.control<boolean>(false),
    correspondent: this.fb.control<Correspondent | null>(null),
    deliveryMethod: this.fb.control<DeliveryMethod | null>(null),
    description: this.fb.control<string | null>(null),
    executionDate: this.fb.control<Date | null>(null),
    file: null,
    outgoingDate: this.fb.control<Date | null>(null),
    outgoingNumber: this.fb.control<string | null>(null),
    regDate: this.fb.control<Date | null>(null),
    regNumber: this.fb.control<string | null>(null),
    topic: this.fb.control<string | null>(null),
  });
}
