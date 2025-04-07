import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Toolbar } from 'primeng/toolbar';
import { IncomingDocument } from '../../models/incoming-document';
import { RegistrationService } from '../../services/registration.service';
import { DocumentRegistrationFormComponent } from './document-registration-form/document-registration-form.component';
@Component({
  selector: 'app-document-registration',
  imports: [
    Toolbar,
    Button,
    TableModule,
    DatePipe,
    DocumentRegistrationFormComponent,
    ToastModule,
    AsyncPipe,
  ],
  templateUrl: './document-registration.component.html',
  styleUrl: './document-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentRegistrationComponent {
  documents = inject(RegistrationService).registeredDocuments$;
  editItem?: IncomingDocument;
  editFormVisible: boolean = false;

  protected onAddButtonClick() {
    this.editFormVisible = true;
  }

  protected onEditButtonClick(data: IncomingDocument) {
    this.editItem = data;
    this.editFormVisible = true;
  }
}
