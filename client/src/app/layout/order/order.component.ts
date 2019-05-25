import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog } from '@angular/material';
import { OrderService } from './order.service';
import { DeleteDialog, AlertService } from '../../shared';
import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import * as jwtDecode from "jwt-decode";
@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
	animations: [routerTransition()]
})
export class OrderComponent implements OnInit {
 
	constructor(
		public dialog: MatDialog,
		private orderService: OrderService,
		private alertService: AlertService,
		private router: Router
	) { }

	ngOnInit() {
		 
	  

	 
	}

 
}
