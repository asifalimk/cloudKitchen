import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public tableWidgetData: {
    columnStructure: Array<object>,
    tableName: string,
    data: any,
    statusInfoNChanges: object,
    tableSearch: boolean

  };

  public columnStructure: any = [
    {
      name: "Id",
      key: "id",
      type: "single",
      cols: []
    },
    {
      name: "name",
      key: "name",
      type: "single",
      cols: []
    },
    {
      name: "username",
      key: "username",
      type: "single",
      cols: []
    },
    {
      name: "mobile",
      key: "mobile",
      type: "single",
      cols: []
    },
    {
      name: "Status",
      key: "status",
      type: "toogle",
      cols: []
    },
  ];


  constructor() { }

  ngOnInit(): void {
    this.initTableData();
  }

  async initTableData() {
    this.tableWidgetData = {
      columnStructure: this.columnStructure,
      data: [],
      statusInfoNChanges: [],
      tableSearch: true,
      tableName: "Users",
    };

  }


}
