import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Correspondent, DeliveryMethod } from '../../../enums';
import { DataOption } from '../../../models/data-option';
import { IncomingDocument } from '../../../models/incoming-document';
import { NotificationService } from '../../../services';
import { EnumService } from '../../../services/enum.service';
import { RegistrationService } from '../../../services/registration.service';

@Component({
  selector: 'app-document-registration-form',
  imports: [
    Dialog,
    Button,
    InputTextModule,
    DatePickerModule,
    Select,
    TextareaModule,
    FileUploadModule,
    ToggleSwitchModule,
    ReactiveFormsModule,
  ],
  providers: [EnumService],
  templateUrl: './document-registration-form.component.html',
  styleUrls: ['./document-registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentRegistrationFormComponent implements OnInit {
  visible = model(false);
  editItem = input<IncomingDocument>();
  closed = output<void>();

  protected correspondents: DataOption<Correspondent>[] =
    this.enumService.getCorrespondents();
  protected deliveryMethods: DataOption<DeliveryMethod>[] =
    this.enumService.getDeliveryMethods();

  invalidFileSizeMessage: string = 'Размер файла превышает 1Мб.';
  invalidFileTypeMessage: string = 'Недопустимый формат и размер файла.';

  constructor(
    private fb: FormBuilder,
    private enumService: EnumService,
    private msgService: NotificationService,
    private registrationService: RegistrationService
  ) {}

  formGroup = this.fb.nonNullable.group({
    access: this.fb.control<boolean>(false),
    control: this.fb.control<boolean>(false),
    correspondent: this.fb.control<Correspondent | null>(null, [
      Validators.required,
    ]),
    deliveryMethod: this.fb.control<DeliveryMethod | null>(null),
    description: this.fb.control<string | null>(null, [
      Validators.maxLength(1000), // Updated max length
    ]),
    executionDeadline: this.fb.control<Date | null>(null),
    file: this.fb.control<File | null>(null), // Changed to control for better handling
    outgoingDate: this.fb.control<Date | null>(null),
    outgoingNumber: this.fb.control<string | null>(null, [regNumberValidator]),
    regDate: this.fb.control<Date | null>(new Date(), [Validators.required]),
    regNumber: this.fb.nonNullable.control<string | null>(null, [
      Validators.required,
      regNumberValidator,
    ]),
    topic: this.fb.control<string | null>(null, [
      Validators.required,
      Validators.maxLength(100),
    ]),
  });

  ngOnInit(): void {
    this.formGroup.patchValue({ ...this.editItem() });
    this.formGroup.controls.executionDeadline.addValidators(
      executionDeadlineValidator(this.formGroup.controls.regDate)
    );
    this.formGroup.controls.regDate.disable();
  }

  onClose() {
    this.closed.emit();
  }

  onBasicUploadAuto(event: FileSelectEvent): void {
    debugger;
    const selectedFile = event.files[0];

    if (selectedFile) {
      const allowedFormats = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const maxSizeMB = 1;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      const isFormatValid = allowedFormats.includes(selectedFile.type);
      const isSizeValid = selectedFile.size <= maxSizeBytes;

      if (!isFormatValid && !isSizeValid) {
        return;
      } else if (!isFormatValid) {
        return;
      } else if (!isSizeValid) {
        return;
      }

      this.formGroup.controls.file.setValue(selectedFile);
    }
  }

  onSave() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      for (const control of Object.values(this.formGroup.controls)) {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
      return;
    }

    if (!this.editItem()) {
      this.saveAction();
    } else {
      this.updateAction();
    }

    this.onClose();
  }

  private saveAction() {
    const document = {
      ...this.formGroup.value,
    } as IncomingDocument;

    debugger;
    this.registrationService.addDocument(document);
    this.msgService.showCreateSuccess();
  }

  private updateAction() {
    const document = {
      ...this.formGroup.value,
    } as IncomingDocument;

    this.registrationService.updateDocument(document);
    this.msgService.showUpdateSuccess();
  }
}

function regNumberValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) {
    return null;
  }

  const hasLetter = /[a-zA-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecial = /[^\w\s]/.test(value);

  const onlyLetters = hasLetter && !hasDigit && !hasSpecial;
  const onlySpecial = !hasLetter && !hasDigit && hasSpecial;

  if (onlyLetters || onlySpecial) {
    return { invalidRegNumber: true };
  }

  return null;
}

function executionDeadlineValidator(regDateControl: AbstractControl) {
  return (control: AbstractControl): ValidationErrors | null => {
    const regDate = regDateControl.value as Date;
    const executionDeadline = control.value as Date;

    if (regDate && executionDeadline && executionDeadline < regDate) {
      return { executionDeadlineBeforeRegDate: true };
    }

    return null;
  };
}
