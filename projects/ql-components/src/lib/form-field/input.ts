import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Destroyable } from '../common/destroyable';

export abstract class InputToken extends Destroyable {
  hasError: BehaviorSubject<boolean>;
  valueChange: Observable<any>;
  height?: string;

  protected constructor() {
    super();
    this.hasError = new BehaviorSubject<boolean>(false);
    this.valueChange = new Subject<string>();
  }


  abstract focus(): void;
}
