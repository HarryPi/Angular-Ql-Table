import { Subject } from 'rxjs';

export abstract class Filter<T> {
  inputData: T[];
  onDataChanged: Subject<T[]>;
  filterFn: (T) => boolean;
}
