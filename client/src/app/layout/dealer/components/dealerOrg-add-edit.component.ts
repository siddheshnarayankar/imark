import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DealerService } from '../dealer.service';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../../shared';
import * as jwtDecode from "jwt-decode";

@Component({
  selector: 'add-edit-dialog',
  templateUrl: './dealerOrg-add-edit-dialog.html'
})
export class DealerOrgAddEditDialog  {
  action: string = 'Add';
  alert: string;
  curr_token_decoded_id: string;

  constructor(
    public dialogRef: MatDialogRef<DealerOrgAddEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dealerService: DealerService,
    private alertService: AlertService
  ) {
    this.action = (data._id) ? 'Edit' : 'Add';
  }

 

  submit() {
    let manager: Observable<any>;
    let curr_token = JSON.parse(localStorage.getItem('userInfo') || '{}');
    let curr_token_decode = jwtDecode(curr_token.token);
    this.curr_token_decoded_id = curr_token_decode._id;
    this.data.curr_dealer_id = this.curr_token_decoded_id;

    if (this.data._id) {
      let id = this.data._id;
      manager = this.dealerService.edit(id, this.data);
    } else {
      manager = this.dealerService.add(this.data);
      console.log(this.data);
    }
    manager.subscribe(
      resp => {
        this.dialogRef.close({
          message: resp.message,
          location: resp.todo,
          action: this.action,
          data : this.data

        });
      },
      error => this.alertService.error(error)
    );

  }
}