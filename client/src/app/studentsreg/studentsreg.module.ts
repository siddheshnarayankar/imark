import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms'
 
import { SharedService, PageHeaderModule, AlertModule } from './../shared';
import { StudentsregRoutingModule } from './studentsreg-routing.module';
import { StudentsregComponent } from './studentsreg.component';
import { StudentsregComponent1 } from './studentsreg1.component';


import { StudentsregService } from './studentsreg.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StudentsregRoutingModule,
        PageHeaderModule,
        DataTablesModule,
        MatDialogModule,
        MatTabsModule,
        AlertModule,
        ReactiveFormsModule
    ],
    declarations: [
        StudentsregComponent,
        StudentsregComponent1
    ],
    providers: [
        StudentsregService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SharedService,
            multi: true
        },
    ],
    entryComponents: [
         
    ]
})
export class StudentsregModule { }
