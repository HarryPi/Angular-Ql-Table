import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintToolbarComponent } from './paint-toolbar.component';

describe('PaintToolbarComponent', () => {
  let component: PaintToolbarComponent;
  let fixture: ComponentFixture<PaintToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
