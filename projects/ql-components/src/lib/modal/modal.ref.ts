import { Subject } from 'rxjs';

export class ModalRef<T, R> {
  componentInstance?: T = null;
  afterClose: Subject<R> = new Subject<R>();
  afterOpen: Subject<R> = new Subject<R>();
}
