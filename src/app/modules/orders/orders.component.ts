import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { OrdersService } from './orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public dialog: MatDialog, private ordersService: OrdersService) { }
  @ViewChild('drawer', { static: false }) drawer: MatSidenav;
  public tableData: any;
  public orderDetails: any;
  public items: any;
  public navColoumns = ['item', 'quantity', 'status']
  public columnStructure: any = [
    {
      name: "#",
      key: "id",
      type: "single",
      cols: []
    },
    {
      name: "User",
      key: "user",
      type: "group",
      cols: [{ "key": "name", "icon": "person" }, { "key": "mobile", "icon": "smartphone" }, { "key": "schedule", "icon": "schedule" }]
    },
    {
      name: "Time",
      key: "created_at",
      type: "date",
      cols: []
    },
    {
      name: "payment",
      parent: "payment",
      key: "name",
      type: "single",
      cols: []
    },
    {
      name: "print",
      key: "print",
      type: "button",
      cols: []
    },
    {
      name: "Action",
      key: "InformationButton",
      type: "menu",
      cols: ["Accept", "Assign"]
    }
  ];

  public tableWidgetData: {
    columnStructure: Array<object>,
    tableName: string,
    data: Array<object>,
    statusInfoNChanges: object,
    tableSearch: boolean
  };

  subscription: Subscription;

  everyThirtySeconds: Observable<number> = timer(0, 30000);

  ngOnInit(): void {
    this.subscription = this.everyThirtySeconds.subscribe(() => {
      this.fetchOrders();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  async initTableData() {
    this.tableWidgetData = {
      columnStructure: this.columnStructure,
      data: this.tableData,
      statusInfoNChanges: [],
      tableSearch: true,
      tableName: "Orders",
    };
  }

  /**
   * 
   * @param data 
   */
  rowClicked(data: any) {
    // this.openDialog(data);
    this.fetchDetails(data.id)
    if (!this.drawer.opened) {
      this.drawer.open();
    } else {
      this.drawer.close();
    }
  }

  buttonClicked(data: any) {
    this.openDialog(data);
  }
  checkValue(event: any) {
    const req = {
      "id": this.orderDetails.order.id,
      "status": event.target.checked,
      "product_id": event.target.value
    };

    this.ordersService.changeOrderPreparedStatus(req).subscribe((res: any) => {
    })
  }
  close(data: any) {
    this.drawer.close();
  }

  menuClicked(data: any) {
    this.changeStatus(data);
  }

  openDialog(data): void {
    this.fetchOrderItemDetails(data.id);
  }

  changeStatus(data): void {
    if (data.type === "Accept") {
      const req = {
        "id": data.data.id,
        "status": 2
      };

      this.ordersService.changeOrderStatus(req).subscribe((res: any) => {
      })
    } else {
      console.log('Assign');
    }

  }

  fetchDetails(id): void {
    this.ordersService.getOrderDetails(id).subscribe((res: any) => {
      this.orderDetails = res.success;
      this.items = this.orderDetails.order.item;
      console.log(this.orderDetails);
    })

  }

  fetchOrderItemDetails(id): void {
    this.ordersService.getOrderDetails(id).subscribe((res: any) => {
      this.orderDetails = res.success;
      const dialogRef = this.dialog.open(OrderDetailsDialog, {
        width: '300px',
        data: res.success
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
      });
    })

  }
  /**
   * fetch list of orders
   */
  fetchOrders(): void {
    this.ordersService.getListOfOrders().subscribe((res: any) => {
      this.tableData = res.success;
      this.initTableData();
    })
  }




}


@Component({
  selector: 'orders-details-dialog',
  templateUrl: './orders-details-dialog.html',
  styleUrls: ['./orders.component.css']
})
export class OrderDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.transactions = data.order.item;
    this.categories = data.categories;
  }
  openDialogData: any;
  displayedColumns: string[] = ['item', 'quantity'];
  transactions: Transaction[];
  categories: Categories[];

  onYesClick(str: any): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  printPage() {
    window.print();
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }


}

export interface Transaction {
  item: string;
  cost: number;
}

export interface Categories {
  name: string;
}
