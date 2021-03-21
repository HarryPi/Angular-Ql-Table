import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavItemComponent } from './sidebar-nav-item.component';

describe('SidebarItemComponent', () => {
  let component: SidebarNavItemComponent;
  let fixture: ComponentFixture<SidebarNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarNavItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
