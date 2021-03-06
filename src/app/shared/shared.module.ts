import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableWidgetComponent } from './components/table-widget/table-widget.component';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { TimeAgoPipe } from './time-ago.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormWidgetComponent } from './components/form-widget/form-widget.component';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule  } from '@angular/material/stepper';

@NgModule({
  declarations: [TableWidgetComponent, TimeAgoPipe, FormWidgetComponent, MenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatRippleModule,
    MatSidenavModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule,
    RouterModule,
    MatGridListModule,
    MatStepperModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    TableWidgetComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    FlexLayoutModule,
    MatRippleModule,
    MatSidenavModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    FormWidgetComponent,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule,
    MenuComponent,
    MatGridListModule,
    MatStepperModule
  ]
})
export class SharedModule { }
