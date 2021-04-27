import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { ModalConfig } from './modal.config';
import { ModalModule } from './modal.module';
import { ModalRef } from './modal.ref';

type ModalContent<T> = ComponentType<T> | TemplateRef<T> | string;

@Injectable({
  providedIn: ModalModule
})
export class ModalService {

  constructor(
      private _overlay: Overlay,
      private _injector: Injector
  ) {
  }

  open<T, R>(config: ModalConfig<T, R>): ModalRef<T, R> {
    return undefined;
  }

  private _open<T, R>(componentOrTemplateRef: ModalContent<T>, config: ModalConfig<T, R>): ModalRef<T, R> {
    const overlayRef: OverlayRef = this._createOverlay<T, R>(config);
    return undefined;
  }

  private _createOverlay<T, R>(config: ModalConfig<T, R>): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().global(),
      disposeOnNavigation: config.disposeOnNavigationClose,
      direction: 'ltr' // todo: Make this global config
    });

    return this._overlay.create(overlayConfig);
  }

  private _attachModal<T, R>(overlayRef: OverlayRef, config: ModalConfig<T, R>): void {
    return undefined;
  }
}
