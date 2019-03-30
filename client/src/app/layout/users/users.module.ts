import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SharedService, PageHeaderModule, AlertModule } from './../../shared';
import { UserAddEditDialog } from './components/user-add-edit.component';
import { UserService } from './user.service';
import { ExcelService } from './user-org-execel.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule,
        MatDialogModule,
        UsersRoutingModule,
        PageHeaderModule,
        AlertModule
    ],
    declarations: [
        UsersComponent,
        UserAddEditDialog,
        UserdetailsComponent
    ],
    providers: [
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SharedService,
            multi: true
        },
        ExcelService
    ],
    entryComponents: [
        [UserAddEditDialog]
    ]
})
export class UsersModule { }
