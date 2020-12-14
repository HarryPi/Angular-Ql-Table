import { Subject } from 'rxjs';

export abstract class Toolbar {
  colors: string[] | { color: string, id: number }[];
  selectedColor: Subject<string>;
  requestUndo: Subject<void>;
}
