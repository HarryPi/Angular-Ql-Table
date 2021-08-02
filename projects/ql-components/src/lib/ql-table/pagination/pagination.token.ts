import { Subject } from 'rxjs';

export abstract class PaginationToken {

  public abstract backButtonClickChange: Subject<void>;
  public abstract nextButtonClickChange: Subject<void>;

  protected _position: 'start' | 'end';
  protected _isLeftButtonEnabled: boolean;
  protected _isRightButtonEnabled: boolean;

  protected constructor() {
  }

  backButtonClicked = () => {
    this.backButtonClickChange.next();
  }

  nextButtonClicked = (): void => {
    this.nextButtonClickChange.next();
  }

  abstract get position(): 'start' | 'end';
  abstract set position(value: 'start' | 'end');

  abstract get isLeftButtonEnabled(): boolean;
  abstract set isLeftButtonEnabled(value: boolean);

  abstract get isRightButtonEnabled(): boolean;
  abstract set isRightButtonEnabled(value: boolean);
}
