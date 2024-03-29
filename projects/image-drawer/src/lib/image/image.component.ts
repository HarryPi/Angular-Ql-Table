import { Component, ElementRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { QImage } from './image';
import { IPoint } from './point';

@Component({
  selector: 'ql-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [
    { provide: QImage, useExisting: ImageComponent }
  ]
})
export class ImageComponent extends QImage implements OnInit {

  @Input() width: number;
  @Input() height: number;
  @Input() imageSrc: string;
  @Input() fitImage: boolean;
  @Input() paintColor = 'black';
  @Input() canvasState: [IPoint[]];

  @Output() shapesChanged: Subject<[IPoint[]]>;

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('image', { static: true }) image: ElementRef<HTMLImageElement>;

  private _pathIsOpen: boolean;
  private _context: CanvasRenderingContext2D;
  private _mouseIsClicked: boolean;
  private _destroy: Subject<void>;
  private _currentLine: IPoint[];

  constructor(
      private _renderer: Renderer2
  ) {
    super();
    this._currentLine = [];
    this._destroy = new Subject<void>();
    this.shapesChanged = new Subject<[IPoint[]]>();
  }

  ngOnInit(): void {
    this._context = this.canvas.nativeElement.getContext('2d');
  }

  drawImageOnCanvas(): void {
    const nativeImage: HTMLImageElement = this.image.nativeElement;
    const nativeCanvas: HTMLCanvasElement = this.canvas.nativeElement;

    if (this.fitImage) {
      this._renderer.setProperty(nativeCanvas, 'width', nativeImage.width);
      this._renderer.setProperty(nativeCanvas, 'height', nativeImage.height);
      this._context.drawImage(nativeImage, 0, 0, nativeImage.width, nativeImage.height);
    } else {
      this._context.drawImage(nativeImage, 0, 0);
    }

    this._hideImage();

    // If a canvas state has been given to the component
    if (this.canvasState) {
      // Draw the canvas
      this._drawCanvasStateOnCanvas();
    }

  }

  beginDraw(event: MouseEvent): void {
    this._mouseIsClicked = true;
  }

  continueDraw(event: MouseEvent): void {
    const { x, y } = this._getCursorPosition(this.canvas.nativeElement, event);
    if (this._mouseIsClicked && !this._pathIsOpen) {
      this._pathIsOpen = true;
      this._drawPoint(x, y, 'START');
    } else if (this._mouseIsClicked) {
      this._drawPoint(x, y);
    }
  }

  continueDrawTouch(event: TouchEvent) {
    const touchX = event.changedTouches[0].pageX;
    const touchY = event.changedTouches[0].pageY;
    const {x,y} = this._getCursorPosition(this.canvas.nativeElement, {clientX: touchX, clientY: touchY});
    if (this._mouseIsClicked && !this._pathIsOpen) {
      this._pathIsOpen = true;
      this._drawPoint(x, y, 'START');
    } else if (this._mouseIsClicked) {
      this._drawPoint(x, y);
    }
  }

  stopDraw(event: MouseEvent): void {
    this._mouseIsClicked = false;
    this._pathIsOpen = false;
    this._context.closePath();
    if (this.canvasState) {
      this.canvasState.push(this._currentLine);
    } else {
      this.canvasState = [[...this._currentLine]];
    }
    // indicate here that state changed
    this.shapesChanged.next(this.canvasState);
    this._currentLine = [];
  }

  undoLastAction(): void {
    const nativeCanvas: HTMLCanvasElement = this.canvas.nativeElement;
    this._context.clearRect(0, 0, nativeCanvas.width, nativeCanvas.height);
    this._showImage();
    this.drawImageOnCanvas();

    // Remove last action from our array
    this.canvasState.pop();
    // indicate here that state changed
    this.shapesChanged.next(this.canvasState);
    // redraw based on new canvs state
    this._drawCanvasStateOnCanvas();
  }

  getPoints(): [IPoint[]] {
    return this.canvasState;
  }

  /**
   * Draws the canvas state onto the HTML Canvas, can happen when undoing an action or when
   * the canvas is first initialized with a state
   * @private
   */
  private _drawCanvasStateOnCanvas(): void {
    for (const points of this.canvasState) {
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        this._drawPoint(point.x, point.y, point.mode, point.color, false);
        if (i === points.length - 1) {
          this._context.closePath();
        }
      }
    }
  }

  private _getCursorPosition(canvas, event): { x: number, y: number } {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return { x, y };
  }

  private _hideImage(): void {
    this._renderer.setStyle(this.image.nativeElement, 'display', 'none');
  }

  private _showImage(): void {
    this._renderer.setStyle(this.image.nativeElement, 'display', 'inline-block');
  }

  private _drawPoint(x: number, y: number, mode: 'DRAW' | 'START' = 'DRAW', color: string = null, save = true): void {
    if (mode === 'START') {
      this._context.beginPath();
      this._context.moveTo(x, y);
    } else {
      this._context.lineTo(x, y);
    }

    this._context.strokeStyle = color ? color : this.paintColor;
    this._context.stroke();

    if (save) {
      this._currentLine.push({ x, y, color: this.paintColor, mode });
    }
  }

}
