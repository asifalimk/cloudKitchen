import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { OrdersService } from './orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(public dialog: MatDialog, private ordersService: OrdersService) { }
  @ViewChild('drawer', { static: false }) drawer: MatSidenav;
  public tableData: any;
  public orderDetails: any;
  public items: any;
  public deliverItems: any;
  public deliveryBoys: any;
  public orderStatus: any;
  public setDeliveryBoy: boolean;
  public selectionChanged: any;
  public navDetailsColoumns = ['item', 'quantity','price']
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

  // everyThirtySeconds: Observable<number> = timer(0, 30000);

  ngOnInit(): void {

    this.fetchOrders();
    this.fetchOrdersStatus()
      // this.subscription = this.everyThirtySeconds.subscribe(() => {
      //   this.fetchOrders();
      //   this.fetchOrdersStatus()
      // });
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
  print()
  {
    this.openDialog(this.orderDetails.order);
    this.drawer.close();
  }
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
    console.log(data);
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

  onChangeSelect(event: any) {
    if(event.value!=null)
    {
      // this.selectionChanged = true;
      this.ordersService.getDeliveryBoyDetails(event.value).subscribe((res: any) => {
      this.selectionChanged = res.success;
      })
    }
    
  }

  onOrderUpdate() {
    console.log(this.selectionChanged);
    const req = {
      "id": this.orderDetails.order.id,
      "deliveryBoy": this.selectionChanged.id
    };

    this.ordersService.assignDeliveryBoy(req).subscribe((res: any) => {
      this.setDeliveryBoy = false;
      this.drawer.close();
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

  onAccept(): void {
      const req = {
        "id": this.orderDetails.order.id,
        "status": 2
      };

      this.ordersService.changeOrderStatus(req).subscribe((res: any) => {
        this.drawer.close();
      })
    

  }

  onReject(): void {
      const req = {
        "id": this.orderDetails.order.id,
        "status": 7
      };

      this.ordersService.changeOrderStatus(req).subscribe((res: any) => {
        this.drawer.close();
      })

  }

  onDispatched(): void {
    const req = {
      "id": this.orderDetails.order.id,
      "status": 5
    };

    this.ordersService.changeOrderStatus(req).subscribe((res: any) => {
      this.drawer.close();
    })

}

  onDeliveryDetailsEdit(): void {
    this.setDeliveryBoy = true;
    // this.orderDetails.order.content.status = 3;
    // this.orderDetails.order.content.deliveryBoy = null;
    // this.drawer.close();
    // this.drawer.open();
  }

  fetchDetails(id): void {
    this.ordersService.getOrderDetails(id).subscribe((res: any) => {
      this.orderDetails = res.success;
      this.items = this.orderDetails.order.item;
      console.log(this.orderDetails);
      if (this.orderDetails.order.content.readyToDeliver) {
        this.ordersService.getDeliveryBoys().subscribe((res: any) => {
          this.deliveryBoys = res.success;
          // this.deliverItems = this.orderDetails.order.items;
          // console.log(this.deliverItems);
        })
      }
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

  fetchOrdersStatus(): void {
    this.ordersService.getOrderStatusCount().subscribe((res: any) => {
      console.log(res)
      this.orderStatus = res.success;
    })
  }

  getTotalCost() {
    return this.items.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }


}


@Component({
  selector: 'orders-details-dialog',
  templateUrl: './orders-details-dialog.html',
  styleUrls: ['./orders.component.scss']
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
