import { AfterContentInit, Component, ContentChild, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { QImage } from '../image/image';
import { Toolbar } from '../paint-toolbar/toolbar';
import { Drawer } from './drawer';

@Component({
  selector: 'ql-image-drawer',
  templateUrl: './image-drawer.component.html',
  styleUrls: ['./image-drawer.component.scss']
})
export class ImageDrawerComponent extends Drawer implements OnInit, AfterContentInit, OnDestroy {

  @ContentChild(QImage) imageComponent: QImage;
  @ContentChild(Toolbar) toolbarComponent: Toolbar;

  private readonly _destroy: Subject<void>;

  constructor() {
    super();
    this._destroy = new Subject<void>();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.toolbarComponent.selectedColor.pipe(
        takeUntil(this._destroy),
        tap(color => {
          if (this.imageComponent) {
            this.imageComponent.paintColor = color;
          }
        })
    ).subscribe();
    this.toolbarComponent.requestUndo.pipe(
        takeUntil(this._destroy),
        tap(() => {
          if (this.imageComponent) {
            this.imageComponent.undoLastAction();
          }
        })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

}
