import { Subject } from 'rxjs';
import { IPoint } from './point';

export abstract class QImage {
  imageSrc: string;
  width: number;
  height: number;
  fitImage: boolean;
  paintColor: string;
  canvasState: [IPoint[]];
  shapesChanged: Subject<[IPoint[]]>;

  abstract undoLastAction(): void;
  abstract getPoints(): [IPoint[]];
}
