import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog } from '@angular/material';
import { UserService } from './user.service';
import { UserAddEditDialog } from './components/user-add-edit.component';
import { DeleteDialog, AlertService, AuthService } from '../../shared';
import { Subject } from 'rxjs/Rx';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
	animations: [routerTransition()]
})
export class UsersComponent implements OnInit {
	dtOptions = {};
	users: Array<any> = [];
	dialogRef: any;
	dtTrigger: Subject<any> = new Subject();
	isRole: any;
	getCurrentUser: any;
    myForm: FormGroup;

	constructor(
		public dialog: MatDialog,
		private userService: UserService,
		private alertService: AlertService,
		private authService: AuthService
	) { }

	 
	ngOnInit() {
		let component = this;
		this.dtOptions = {
			paginationType: 'full_numbers',
			displayLength: 2,
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


		this.getCurrentUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
		this.isRole = this.getCurrentUser.role;
		console.log(this.isRole, 'Role');
		// this.authService.getUserInfo().subscribe(
		// 	resp => {
		// 	//	this.isRole = resp.role;
		// 		console.log(resp);
		// 	},
		// 	error => this.alertService.error(error)
		// );


		this.userService.get().subscribe(
			resp => {
				this.users = resp;
				console.log(this.users, 'Users');
				this.dtTrigger.next();
			},
			error => this.alertService.error(error)
		);

		   this.myForm = new FormGroup({
      name: new FormControl('Benedict'),
      email: new FormControl(''),
      message: new FormControl('')
    });
	}

	openDialog(data): void {
		this.dialogRef = this.dialog.open(UserAddEditDialog, {
			width: '350px',
			data: data
		});

		this.dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.alertService.success(result.message);

				if (result.action == 'Add') {
					this.users.push(result.data);
				}
			}
		});
	}

	edit(user) {
		this.openDialog(user);
	}
	delete(user) {
		let deleteDialogRef = this.dialog.open(DeleteDialog, {
			width: '350px',
			data: user
		});

		deleteDialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.userService.delete(result._id).subscribe(
					resp => {
						this.users.splice(this.users.indexOf(result), 1);
						this.alertService.success(resp.message)
					},
					error => this.alertService.error(error)
				);
			}
		});
	}

	onSubmit(form: FormGroup) {
		// TODO: Use EventEmitter with form value
		console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
	}

}
