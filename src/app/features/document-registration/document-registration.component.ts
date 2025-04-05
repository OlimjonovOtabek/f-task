import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-document-registration',
  imports: [Toolbar, Button],
  templateUrl: './document-registration.component.html',
  styleUrl: './document-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentRegistrationComponent {

}
