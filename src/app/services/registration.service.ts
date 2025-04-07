import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IncomingDocument } from '../models/incoming-document';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private documents: BehaviorSubject<IncomingDocument[]>;
  public registeredDocuments$: Observable<IncomingDocument[]>;

  constructor() {
    this.documents = new BehaviorSubject<IncomingDocument[]>([]);
    this.registeredDocuments$ = this.documents.asObservable();
  }

  public addDocument(document: IncomingDocument) {
    this.documents.next([...this.documents.getValue(), document]);
  }

  public deleteDocument(document: IncomingDocument) {
    this.documents.next(
      this.documents.getValue().filter(d => d.regNumber !== document.regNumber)
    );
  }

  public updateDocument(document: IncomingDocument) {
    this.documents.next(
      this.documents
        .getValue()
        .map(d => (d.regNumber === document.regNumber ? document : d))
    );
  }

  public getPagedDocuments(page: number, pageSize: number): IncomingDocument[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return this.documents.getValue().slice(startIndex, endIndex);
  }
}
