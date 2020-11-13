import { Subject } from 'rxjs';

export abstract class Filter<T> {
  inputValueChanged: Subject<string>;
  filterFn: (T) => boolean;
}
