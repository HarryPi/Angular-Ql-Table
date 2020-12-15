import { IPoint } from '../image/point';
import { QColorModel } from '../shared/models/qcolor.model';

export abstract class Drawer {
  abstract getCurrentState(): DrawerState;
}

export abstract class DrawerState {
  colors: QColorModel[];
  shapes: [IPoint[]];
}
