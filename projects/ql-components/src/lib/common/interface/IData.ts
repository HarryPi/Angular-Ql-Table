import { Observable } from 'rxjs';

export interface IData<T> {
  data: T[] | Observable<T[]>;
}
