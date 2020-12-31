import { QColorModel } from '../../shared/models/qcolor.model';

export abstract class ExtraToolbarToken {
  selectedColor: QColorModel;
  colors: QColorModel[];
}
