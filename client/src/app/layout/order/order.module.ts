import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms'
 

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedService, PageHeaderModule, AlertModule } from './../../shared';
import { OrderService } from './order.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrderRoutingModule,
        PageHeaderModule,
        DataTablesModule,
        MatDialogModule,
        MatTabsModule,
        AlertModule,
        ReactiveFormsModule
    ],
    declarations: [
        OrderComponent
    ],
    providers: [
        OrderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SharedService,
            multi: true
        }
    ] 
})
export class OrderModule { }
