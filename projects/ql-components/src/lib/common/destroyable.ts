import { Subject } from 'rxjs';

export abstract class Destroyable {
  protected _onDestroy: Subject<void>;

  protected constructor() {
    this._onDestroy = new Subject<void>();
  }

  protected onDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
