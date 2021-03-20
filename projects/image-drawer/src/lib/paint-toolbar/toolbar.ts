import { Subject } from 'rxjs';
import { QColorModel } from '../shared/models/qcolor.model';

export abstract class Toolbar {
  colors: string[] | QColorModel[];
  colorsChange: Subject<string[] | QColorModel[]>;

  selectedColor: Subject<string>;
  requestUndo: Subject<void>;
  requestExportState: Subject<QColorModel[]>;

  abstract getColors(): QColorModel[];
}

