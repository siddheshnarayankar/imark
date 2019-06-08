import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeleteDialog, AlertService } from '../../../shared';
import { UserService } from './../user.service';
import { Subject } from 'rxjs/Rx';
import { ExcelService } from './../user-org-execel.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {

dtTrigger: Subject<any> = new Subject();
dtOptions = {};
  get_user_id: any;
  user_org_list: any;

  //Counter student tokens
  countStdTotal: any;
  countStdPer: any;
  countStdCurr: any;
 
  usersDetails:any;


  constructor(private userService: UserService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService,
    private excelService: ExcelService,
    private router: Router) { }


  ngOnInit() {
    // window.location.href='E:/GitImarkCode/imark/uploads';
    // window.open('file://E:/GitImarkCode/imark/uploads/'); 

    //  const url = window.URL('E:\GitImarkCode\imark\uploads');
    //window.open(url);
	this.dtOptions = {
			paginationType: 'full_numbers',
			displayLength: 10,
			select: true,
			dom: 'Bfrtip',
      	buttons: [
				 
			]
		};

    this.activateRoute.params.subscribe(params => {
      this.get_user_id = params.id;
      console.log(params.id, 'params');
    });

    //Get user Details 
	this.userService.getUserWithId(this.get_user_id).subscribe(
			resp => {
        if(resp.length){
	        this.usersDetails = resp;
        }
		 
			},
			error => this.invalidURL()
  );


    this.userService.getOrgList(this.get_user_id)
    ///  .map(items => items.filter(item => item.status === 'true'))
      .subscribe(
      resp => {
       if(resp.length){
        this.user_org_list = resp;
         this.dtTrigger.next();
        console.log(this.user_org_list, 'resp');
       }
      },
      error => this.invalidURL()
      );

    // this.userService.getStdList(this.user_org_list._id).subscribe(
    //   resp => {
    //     console.log(resp, 'Candidate Data');
    //   }
    // )
    //this.getStudentStatus();

  }

  invalidURL(){
  
		Swal.fire({
			title: '',
			text: 'InValid URL',
			type: 'error',
			showCancelButton: false,
			confirmButtonText:'Back',
      allowOutsideClick:false,
      backdrop:true
		}).then((result) => {
       setTimeout(()=>{
              this.router.navigate(['/users']);
      },0)
    })   
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

  getListOfStud(selectedOrgId,collegeName) {
    console.log(selectedOrgId);
    this.userService.getCandidateList(selectedOrgId).subscribe(
      resp => {
        //  this.dtTrigger.next();
        this.excelService.exportAsExcelFile(resp, collegeName + " " + 'candidates Records');
        console.log(resp, 'Stude list');
      },
      error => this.alertService.error(error)
    );
  }

}
