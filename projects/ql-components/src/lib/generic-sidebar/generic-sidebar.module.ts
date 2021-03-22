import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { SidebarGroupComponent } from './sidebar-content/sidebar-group/sidebar-group.component';
import { SidebarItemComponent } from './sidebar-content/sidebar-item/sidebar-item.component';
import { SidebarHeaderItemDirective } from './sidebar-header/sidebar-header-item.directive';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarComponent } from './sidebar.component';


@NgModule({
  declarations: [
      SidebarComponent,
      SidebarHeaderComponent,
      SidebarHeaderItemDirective,
      SidebarContentComponent,
      SidebarGroupComponent,
      SidebarItemComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
      SidebarComponent,
      SidebarHeaderComponent,
      SidebarHeaderItemDirective,
      SidebarContentComponent,
      SidebarGroupComponent,
      SidebarItemComponent,
  ]
})
export class GenericSidebarModule { }
