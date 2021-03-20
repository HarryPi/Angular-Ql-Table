import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraToolbarComponent } from './extra-toolbar.component';

describe('ExtraToolbarComponent', () => {
  let component: ExtraToolbarComponent;
  let fixture: ComponentFixture<ExtraToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
