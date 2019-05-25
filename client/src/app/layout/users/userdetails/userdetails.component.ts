import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeleteDialog, AlertService } from '../../../shared';
import { UserService } from './../user.service';

import { ExcelService } from './../user-org-execel.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {


  get_user_id: any;
  user_org_list: any;

  //Counter student tokens
  countStdTotal: any;
  countStdPer: any;
  countStdCurr: any;



  constructor(private userService: UserService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService,
    private excelService: ExcelService) { }


  ngOnInit() {
    // window.location.href='E:/GitImarkCode/imark/uploads';
    // window.open('file://E:/GitImarkCode/imark/uploads/'); 

    //  const url = window.URL('E:\GitImarkCode\imark\uploads');
    //window.open(url);


    this.activateRoute.params.subscribe(params => {
      this.get_user_id = params.id;
      console.log(params.id, 'params');
    });

    this.userService.getOrgList(this.get_user_id)
      .map(items => items.filter(item => item.status === 'true'))
      .subscribe(
      resp => {
        //  this.get_org_details.push(resp);
        this.user_org_list = resp;
        //  this.dtTrigger.next();
        console.log(this.user_org_list, 'resp');
      },
      error => this.alertService.error(error)
      );

    // this.userService.getStdList(this.user_org_list._id).subscribe(
    //   resp => {
    //     console.log(resp, 'Candidate Data');
    //   }
    // )
    //this.getStudentStatus();

  }

  getStudentStatus(id) {
    this.userService.getTokenStatus(id).subscribe(
      resp => {
        console.log(resp[0].stud_token, 'Stude list');
        this.countStdTotal = resp[0].stud_token.length;
        let count = resp[0].stud_token.filter(item => item['status'] === false);
        this.countStdCurr = count.length;

        this.countStdPer = (100 / this.countStdTotal) * this.countStdCurr;
        console.log(this.countStdPer, 'count');

      },
      error => this.alertService.error(error)
    );
  }

  getListOfStud(selectedOrgId) {
    console.log(selectedOrgId);
    this.userService.getCandidateList(selectedOrgId).subscribe(
      resp => {
        //  this.dtTrigger.next();
        this.excelService.exportAsExcelFile(resp, 'Candidates Records Folder');
        console.log(resp, 'Stude list');
      },
      error => this.alertService.error(error)
    );
  }

}
