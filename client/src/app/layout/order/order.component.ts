import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OrderService } from './order.service';
import { DeleteDialog, AlertService } from '../../shared';
import { Subject } from 'rxjs/Rx';
 
import * as jwtDecode from "jwt-decode";

import Swal from 'sweetalert2'


@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
	animations: [routerTransition()]
})
export class OrderComponent implements OnInit {

	orderForm: FormGroup;
	options: any;
	numberPattern = "^[a-z0-9_-]{8,15}$";
	orders = [
		{ id: 1, name: 'First Name', state: false },
		{ id: 2, name: 'Last Name', state: false },
		{ id: 3, name: 'Gender', state: false },
		{ id: 4, name: 'blood Group', state: false },
		{ id: 5, name: 'Phone Number', state: false },

	];
	selectedOptions: any = [];
	dealerId:any;
	collegeDetails:any;
	curr_collegeId:any;
	isSave:boolean=false;
	title:any = 'College Order Create';
	
	constructor(
		private _fb: FormBuilder,
		public dialog: MatDialog,
		private orderService: OrderService,
  private activateRoute: ActivatedRoute,
		private alertService: AlertService,
		private router: Router
	) {

		this.orderForm = this._fb.group({
			orgName: new FormControl('', Validators.required),
			orgAdd: new FormControl('', Validators.required),
			orgPhoneNumber:new FormControl(''),
			orgHODName:new FormControl(''),
			orgStdCount: new FormControl('', [Validators.required]),
			orderFields: new FormControl(''),
			orgIDLayout:new FormControl(''),
			orgURLPrfix: new FormControl(''),
			orgURLName: new FormControl(''),
			// orders: new FormArray([]),
			dealer_id:''

		})
		//this.addCheckboxes();
	}

	private addCheckboxes() {
		this.orders.map((o, i) => {
			console.log(i);
			const control = new FormControl(i===0); // if first item set to true, else false
			(this.orderForm.controls.orders as FormArray).push(control);
		});

	}
	get f() { return this.orderForm.controls; }
	
	ngOnInit() {
    let curr_token = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.dealerId = curr_token.id;

	console.log(this.dealerId);

	    // Get ID 
    this.activateRoute.params.subscribe(params => {
     
      this.curr_collegeId = params.id

	  if(params.id){
		  this.isSave=true;
		  this.title= "College Order Update";
		  	this.onOrderUpdate();
	  }
      console.log(params.id, 'params');

    });

	


	}
  public hasError = (controlName: string, errorName: string) =>{
    return this.orderForm.controls[controlName].hasError(errorName);
  }

 onOrderUpdate() {
    this.orderService.getDealerDetails(this.curr_collegeId).subscribe(
      resp => {
        this.collegeDetails = resp;
        
        console.log(this.collegeDetails,'College Details');
    
        
       this.orderForm.controls['orgName'].setValue(this.collegeDetails[0].orgName);
	    this.orderForm.controls['orgAdd'].setValue(this.collegeDetails[0].orgAdd);
		 this.orderForm.controls['orgPhoneNumber'].setValue(this.collegeDetails[0].orgPhoneNumber);
		  this.orderForm.controls['orgIDLayout'].setValue(this.collegeDetails[0].orgIDLayout);
		  this.orderForm.controls['orgStdCount'].setValue(this.collegeDetails[0].orgStdCount);
		   
     // this.dtTrigger.next();
      },
      error => this.alertService.error(error)
    );
  }
	// onChange(e, val) {
	// 	this.selectedOptions.push(val);



	// }

onOrderFormUpdate(formData: FormGroup){
	 formData.controls['dealer_id'].setValue(this.dealerId);
if (formData.valid) {
	   
	    this.orderService.edit(this.curr_collegeId,formData.value).subscribe(rsp => {
				if(rsp.status){
						Swal.fire({
						title: '',
						text: 'Order Form Updated',
						type: 'success',
						showCancelButton: false,
						confirmButtonText: 'Ok'
					 
					})
				}
				
		})
}
 else{
		  console.log('Not Valid',formData)
	 
		  this.alertService.errorValid('Enter Required Fields *');
	  }
}

	onOrderFormSubmit(formData: FormGroup) {

		
if (formData.valid) {
		//console.log(this.selectedOptions)
		formData.controls['orderFields'].setValue(this.selectedOptions);
	    formData.controls['dealer_id'].setValue(this.dealerId);

	  

		this.orderService.add(formData.value).subscribe(rsp => {

		})

		//console.log(formData.value)

		Swal.fire({
			title: '',
			text: 'Order Form Created',
			type: 'success',
			showCancelButton: false,
			confirmButtonText: 'Ok',
		}).then((result) => {
						setTimeout(()=>{
								this.router.navigate(['/dealer']);
						},0)
						}) 

	  }else{
		  console.log('Not Valid',formData)
	 
		  this.alertService.errorValid('Enter Required Fields *');
	  }
	}
}
