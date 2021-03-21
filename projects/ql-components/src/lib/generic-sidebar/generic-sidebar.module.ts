import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarHeaderItemDirective } from './sidebar-header/sidebar-header-item.directive';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';



@NgModule({
  declarations: [
      SidebarComponent,
      SidebarHeaderComponent,
      SidebarHeaderItemDirective,
      SidebarContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      SidebarComponent,
      SidebarHeaderComponent,
      SidebarHeaderItemDirective
  ]
})
export class GenericSidebarModule { }
