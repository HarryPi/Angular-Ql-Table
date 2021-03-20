import { AfterContentInit, Component, ContentChild, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { QImage } from '../image/image';
import { Toolbar } from '../paint-toolbar/toolbar';
import { Drawer, DrawerState } from './drawer';

@Component({
  selector: 'ql-image-drawer',
  templateUrl: './image-drawer.component.html',
  styleUrls: ['./image-drawer.component.scss'],
  providers: [
    { provide: Drawer, useExisting: ImageDrawerComponent }
  ]
})
export class ImageDrawerComponent extends Drawer implements OnInit, AfterContentInit, OnDestroy {

  @ContentChild(QImage, { static: true }) imageComponent: QImage;
  @ContentChild(Toolbar, { static: true }) toolbarComponent: Toolbar;

  @Output()
  drawerStateChange: Subject<DrawerState>;

  @Input() initialState: DrawerState;

  private readonly _destroy: Subject<void>;

  constructor() {
    super();
    this._destroy = new Subject<void>();
    this.drawerStateChange = new Subject<DrawerState>();
  }

  ngOnInit(): void {
    this._initializeState();
    this._setUpToolbar();
    this._registerStateChangeObserver();
  }

  ngAfterContentInit(): void {

  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  getCurrentState(): DrawerState {
    return {
      colors: this.toolbarComponent ? this.toolbarComponent.getColors() : [],
      shapes: this.imageComponent ? this.imageComponent.getPoints() : []
    } as DrawerState;
  }

  getDrawerState(): DrawerState {
    return this.getCurrentState();
  }

  private _initializeState(): void {
    if (this.initialState) {
      if (this.toolbarComponent) {
        this.toolbarComponent.colors = this.initialState.colors ?? [];
      }
      if (this.imageComponent) {
        this.imageComponent.canvasState = this.initialState.shapes ?? null;
      }
    }
  }

  private _setUpToolbar(): void {
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
    this.toolbarComponent.requestExportState.pipe(
        takeUntil(this._destroy),
        tap(() => this.drawerStateChange.next(this.getCurrentState()))
    ).subscribe();
  }

  private _registerStateChangeObserver(): void {
    combineLatest([
      this.imageComponent.shapesChanged.pipe(startWith(this.imageComponent.canvasState)),
      this.toolbarComponent.colorsChange.pipe(startWith(this.toolbarComponent.colors))
    ]).pipe(
        takeUntil(this._destroy)
      )
      .subscribe(() => this.drawerStateChange.next(this.getCurrentState()));
  }
}
