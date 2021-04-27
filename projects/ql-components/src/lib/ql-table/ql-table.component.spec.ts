import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlTableComponent } from './ql-table.component';

describe('QlTableComponent', () => {
  let component: QlTableComponent;
  let fixture: ComponentFixture<QlTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
