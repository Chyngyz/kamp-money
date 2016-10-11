import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalViewService {
    private modalViewSource = new Subject<String>();

    modalView$ = this.modalViewSource.asObservable();

    announceModalView(message: string) {
        this.modalViewSource.next(message);
    }
}
