export class SidebarNavItem {
  private _title: string;
  private _icon: string;
  private _link: string;

  constructor(sidebarItem: Partial<SidebarNavItem>) {
    const {
      title = '',
      icon = '',
      link = '',
    } = sidebarItem;

    this._icon = sidebarItem.icon;
    this._title = sidebarItem.title;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }
}
