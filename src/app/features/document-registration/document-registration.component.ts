import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { Correspondent, DeliveryMethod } from '../../enums';
import { IncomingDocument } from '../../models/incoming-document';
@Component({
  selector: 'app-document-registration',
  imports: [Toolbar, Button, TableModule, DatePipe],
  templateUrl: './document-registration.component.html',
  styleUrl: './document-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentRegistrationComponent implements OnInit {

  documents: IncomingDocument[] = [];

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
      }
    ];
  }

}
