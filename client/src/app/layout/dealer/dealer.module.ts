import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms'
// import { FileSelectDirective } from 'ng2-file-upload';

import { DealerRoutingModule } from './dealer-routing.module';
import { DelearComponent } from './dealer.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';
import { SharedService, PageHeaderModule, AlertModule } from './../../shared';
import { DealerOrgAddEditDialog } from './components/dealerOrg-add-edit.component';
import { DealerService } from './dealer.service';
import { ExcelService } from './dealer-org-execel.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DealerRoutingModule,
        PageHeaderModule,
        DataTablesModule,
        MatDialogModule,
        MatTabsModule,
        AlertModule,
        ReactiveFormsModule
    ],
    declarations: [
        DelearComponent,
        DealerDetailsComponent,
        DealerOrgAddEditDialog
        // FileSelectDirective
    ],
    providers: [
        DealerService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SharedService,
            multi: true
        },
        ExcelService
    ],
    entryComponents: [
        [DealerOrgAddEditDialog]
    ]
})
export class DealerModule { }
