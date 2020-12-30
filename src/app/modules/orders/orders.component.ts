import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription, timer } from 'rxjs';
import { OrdersService } from './orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public dialog: MatDialog, private ordersService: OrdersService) { }

  public tableData: any;
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
      key: "payment",
      type: "single",
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
    this.openDialog(data);
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(OrderDetailsDialog, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
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

  }

  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'chicken 65', cost: 420 },
    { item: 'cococola', cost: 95 },
    { item: 'burger', cost: 20 }
  ];

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
