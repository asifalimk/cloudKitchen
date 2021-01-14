import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
  }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule

  ]
})
export class UsersModule { }
