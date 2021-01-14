import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  _menuItems: Array<any>;
  get menuItems(): Array<any> {
    return this._menuItems;
  }

  @Input('menuItems')
  set menuItems(value: Array<any>) {
    this._menuItems = value;
    this.updateMenus();
  }

  menus: Array<any>;
  constructor() { }

  ngOnInit() {

    this.updateMenus();

  }

  updateMenus() {
    this.menus = this.menuItems.filter(item => item.parentId == 0);
  }

  /**
   * Get the sub menus for the menu
   * @param  {number} id
   */
  getSubMenu(id: number) {
    const submenu = this.menuItems.filter(item => item.parentId == id);
    return submenu;
  }

  openMegaMenu() {
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
      if (el.children.length > 0) {
        if (el.children[0].classList.contains('mega-menu')) {
          el.classList.add('mega-menu-pane');
        }
      }
    });
  }

}

