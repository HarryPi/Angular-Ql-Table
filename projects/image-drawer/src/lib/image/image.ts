import { IPoint } from './point';

export abstract class QImage {
  imageSrc: string;
  width: number;
  height: number;
  fitImage: boolean;
  paintColor: string;

  abstract undoLastAction(): void;
  abstract getPoints(): [IPoint[]];
}
