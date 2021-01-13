import { Component, OnInit } from '@angular/core';
import { Users, UsersService, UserData } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  createFormStructure: any
  users: UserData;

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
      name: "role",
      key: "role",
      type: "single",
      cols: []
    },
  ];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.createFormStructure = [
      {
        name: "Name",
        formcontrol: "name",
        type: "textbox",
        placeholder: "name",
        validators: [{
          name: "required",
          validator: "required",
          message: "Name is Required"
        }]
      },
      {
        name: "User Name",
        formcontrol: "username",
        type: "textbox",
        placeholder: "username",
        validators: [{
          name: "required",
          validator: "required",
          message: "Username is Required"
        }]
      },
      {
        name: "Mobile Number",
        formcontrol: "mobile",
        type: "textbox",
        placeholder: "Mobile Number",
        validators: [{
          name: "required",
          validator: "required",
          message: "Mobile Number is Required"
        }]
      },
      {
        formcontrol: "role",
        type: "selectBox",
        placeholder: "Role",
        options: [{
          id: 'admin',
          content: {
            title: 'Admin'
          }
        }],
        validators: [{
          name: "required",
          validator: "required",
          message: "Role Required"
        }]
      },
    ]

    this.getUsers();
  }


  getUsers(): void {
    this.usersService.fetchUsers().subscribe((res: Users) => {
      this.users = res.message;
      this.initTableData();
    })
  }

  /**
   * 
   * @param data 
   */
  onSubmit(data): void {
    console.log(data)
  }

  async initTableData() {
    this.tableWidgetData = {
      columnStructure: this.columnStructure,
      data: this.users,
      statusInfoNChanges: [],
      tableSearch: true,
      tableName: "Users",
    };

  }
}
