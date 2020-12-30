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
      cols: [{ "key": "name", "icon": "person" },{ "key": "mobile", "icon": "smartphone" },{ "key": "schedule", "icon": "schedule" }]
    },
    {
      name: "Location",
      key: "created_at",
      type: "single",
      cols: []
    },
    {
      name: "Total",
      key: "total",
      type: "single",
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

    console.log(this.data)
  }


  onYesClick(str: any): void {
    this.dialogRef.close(true);
    console.log(this.data)
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

}

