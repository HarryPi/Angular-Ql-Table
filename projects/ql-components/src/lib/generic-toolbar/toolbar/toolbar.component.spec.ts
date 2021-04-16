import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: QlToolbarComponent;
  let fixture: ComponentFixture<QlToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QlToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
