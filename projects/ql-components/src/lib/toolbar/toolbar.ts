import { Observable } from 'rxjs';
import { IData } from '../common/interface/IData';

export abstract class Toolbar<T> implements IData<T>{
  data: T[] | Observable<T[]>;
}
