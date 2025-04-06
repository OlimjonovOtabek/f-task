import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { Correspondent, DeliveryMethod } from '../../enums';
import { IncomingDocument } from '../../models/incoming-document';
import { DocumentRegistrationFormComponent } from './document-registration-form/document-registration-form.component';
@Component({
  selector: 'app-document-registration',
  imports: [
    Toolbar,
    Button,
    TableModule,
    DatePipe,
    DocumentRegistrationFormComponent,
  ],
  templateUrl: './document-registration.component.html',
  styleUrl: './document-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentRegistrationComponent implements OnInit {
  documents: IncomingDocument[] = [];

  editFormVisible: boolean = false;

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documents = [
      {
        regNumber: '12345',
        regDate: new Date(),
        deliveryMethod: DeliveryMethod.Email,
        correspondent: Correspondent.CB,
        topic: 'Project Update',
        access: true,
        control: false,
      },
      {
        regNumber: '67890',
        regDate: new Date(),
        deliveryMethod: DeliveryMethod.Email,
        correspondent: Correspondent.HOA,
        topic: 'Meeting Minutes',
        access: false,
        control: true,
      },
    ];
  }

  protected onAddButtonClick() {
    this.editFormVisible = true;
    console.log('Add new document');
  }
}
