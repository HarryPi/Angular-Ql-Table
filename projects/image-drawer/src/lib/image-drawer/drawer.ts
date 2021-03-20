import { Subject } from 'rxjs';
import { IPoint } from '../image/point';
import { QColorModel } from '../shared/models/qcolor.model';

export abstract class Drawer {
  drawerStateChange: Subject<DrawerState>;
  initialState: DrawerState;

  abstract getDrawerState(): DrawerState;
}

export abstract class DrawerState {
  colors: QColorModel[];
  shapes: [IPoint[]];
}
