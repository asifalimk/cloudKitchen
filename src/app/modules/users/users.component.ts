import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users, UsersService, UserData } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  createFormStructure: any
  users: UserData;
  @ViewChild('drawer') public drawer: MatSidenav;

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
    {
      name: "Status",
      key: "status",
      type: "toogle",
      cols: []
    },
  ];

  constructor(private usersService: UsersService, private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.createFormStructure = [
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
        name: "Password",
        formcontrol: "password",
        type: "textbox",
        placeholder: "Password",
        validators: [{
          name: "required",
          validator: "required",
          message: "Password is Required"
        }]
      },
      {
        name: "Mobile",
        formcontrol: "mobile",
        type: "textbox",
        placeholder: "mobile",
        validators: [{
          name: "required",
          validator: "required",
          message: "Mobile is Required"
        }]
      },
      {
        name: "Role",
        formcontrol: "role",
        type: "selectBox",
        placeholder: "Role",
        options: [{
          id: 'admin',
          content: {
            title: 'Admin'
          }
        },
        {
          id: 'staff',
          content: {
            title: 'Staff'
          }
        },
        {
          id: 'delivery',
          content: {
            title: 'Delivery Boy'
          }
        }],
        validators: [{
          name: "required",
          validator: "required",
          message: "Role Required"
        }]
      },
      {
        name: "Store",
        formcontrol: "store",
        type: "selectBox",
        placeholder: "Store",
        options: [{
          id: 1,
          content: {
            title: 'Kozhikode'
          }
        }
        ],
        validators: [{
          name: "required",
          validator: "required",
          message: "Store Required"
        }]
      },
    ]

    this.getUsers();
  }

  /**
   * 
   *
   */
  getUsers(): void {
    this.usersService.fetchUsers().subscribe((res: Users) => {
      this.users = res.message
      console.log(res)
      this.initTableData();
    })
  }

  /**
   * 
   * @param data 
   */
  onSubmit(data): void {
    this.usersService.addUsers(data).subscribe(res => {
      this._snackBar.open("User Created", '×', { panelClass: 'snackbar-success', duration: 3000 });
      this.drawer.close();
      this.getUsers();
    })
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

  /**
   * 
   * @param event 
   * change status
   */
  changeStatus(event){
    console.log(event);
    const dialogRef = this.dialog.open(UserStatusDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }
}


@Component({
  selector: 'user-status-dialog',
  templateUrl: './user-status-dialog.html',
  styleUrls: ['./users.component.css']
})
export class UserStatusDialog{
  constructor(public dialogRef: MatDialogRef<UserStatusDialog>){
    
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}