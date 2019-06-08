import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog } from '@angular/material';
import { DealerService } from './dealer.service';
import { DealerOrgAddEditDialog } from './components/dealerOrg-add-edit.component';
import { DeleteDialog, AlertService } from '../../shared';
import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import * as jwtDecode from "jwt-decode";
@Component({
	selector: 'app-dealer',
	templateUrl: './dealer.component.html',
	styleUrls: ['./dealer.component.scss'],
	animations: [routerTransition()]
})
export class DelearComponent implements OnInit {
	dtOptions = {};
	dealers: Array<any> = [];
	dialogRef: any;
	dtTrigger: Subject<any> = new Subject();
	dealerOrgId: any;
	isDealerDetails: boolean = false;
	curr_token_decoded_id: string;

	//New 
	dealerId:any;
	constructor(
		public dialog: MatDialog,
		private dealerService: DealerService,
		private alertService: AlertService,
		private router: Router
	) { }

	ngOnInit() {
		let component = this;
		this.dtOptions = {
			paginationType: 'full_numbers',
			displayLength: 4,
			select: true,
			dom: 'Bfrtip',
			buttons: [
				//'columnsToggle',
				{
					text: 'Add New',
					action: function (e, dt, node, config) {
						component.openDialog({});
					}
				},
				'copy',
				'print',
				'excel'
			]
		};

		let curr_token = JSON.parse(localStorage.getItem('userInfo') || '{}');
		//let curr_token_decode = jwtDecode(curr_token.token);
		this.dealerId = curr_token.id;
	   console.log(this.curr_token_decoded_id);

	   // Get Colleges Details for Current Dealer  
		this.dealerService.get(this.dealerId)
			.subscribe(
			resp => {
				this.dealers = resp;
				this.dtTrigger.next();
			},
			error => this.alertService.error(error)
			);
	}

	openDialog(data): void {
		this.dialogRef = this.dialog.open(DealerOrgAddEditDialog, {
			width: '350px',
			data: data
		});

		this.dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.alertService.success(result.message);
				if (result.action == 'Add') {

					console.log(result,'result.data');
					setTimeout(()=>{
						this.dealers.push(result.data);
					},3000);
					
				  console.log(this.dealers);
				}
			}
		});
	}

	edit(dealer) {
		this.openDialog(dealer);
	}
	delete(dealer) {
		let deleteDialogRef = this.dialog.open(DeleteDialog, {
			width: '350px',
			data: dealer
		});

		deleteDialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.dealerService.delete(result._id).subscribe(
					resp => {
						this.dealers.splice(this.dealers.indexOf(result), 1);
						console.log(this.dealers);
						this.alertService.success(resp.message)
					},
					error => this.alertService.error(error)
				);
			}
		});
	}

	// Details Button Click Action :START
	details(parm_org_id: any) {
		this.dealerOrgId = parm_org_id;
		this.isDealerDetails = true;
		console.log('test', parm_org_id);
	}
	//:END
	bakcToDealer() {
		this.isDealerDetails = false;
	}
}
