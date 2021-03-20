import { BehaviorSubject } from 'rxjs';
import { Destroyable } from '../common/destroyable';

export abstract class InputToken extends Destroyable {
    hasError: BehaviorSubject<boolean>;

    protected constructor() {
        super();
        this.hasError = new BehaviorSubject<boolean>(false);
    }

    abstract focus(): void;
}
