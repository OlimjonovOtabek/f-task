import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { saveAs } from 'file-saver';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { IncomingDocument } from '../../models/incoming-document';
import { YesNoPipe } from '../../pipes/yes-no.pipe';
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
    AsyncPipe,
    Button,
    Tooltip,
    YesNoPipe,
  ],
  providers: [],
  templateUrl: './document-registration.component.html',
  styleUrl: './document-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentRegistrationComponent {
  documentService = inject(RegistrationService);
  editItem?: IncomingDocument;
  editFormVisible: boolean = false;

  protected onAddButtonClick() {
    this.editFormVisible = true;
  }

  protected onEditButtonClick(data: IncomingDocument) {
    this.editItem = data;
    this.editFormVisible = true;
  }

  onDelete(document: IncomingDocument) {
    this.documentService.deleteDocument(document);
  }

  saveButton(file: Blob) {
    saveAs(file);
  }
}
