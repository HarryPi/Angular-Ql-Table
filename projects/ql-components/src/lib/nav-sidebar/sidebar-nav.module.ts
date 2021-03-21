import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SidebarNavComponent } from './sidebar-nav.component';
import { SidebarNavItemComponent } from './nav-sidebar-item/sidebar-nav-item.component';


@NgModule({
  declarations: [
    SidebarNavComponent,
    SidebarNavItemComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule
  ],
  exports: [
    SidebarNavComponent
  ]
})
export class SidebarNavModule {
}
