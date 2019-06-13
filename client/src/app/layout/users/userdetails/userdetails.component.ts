import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeleteDialog, AlertService } from '../../../shared';
import { UserService } from './../user.service';
import { Subject } from 'rxjs/Rx';
import { ExcelService } from './../user-org-execel.service';
import Swal from 'sweetalert2'
import { saveAs } from "file-saver";
import * as JSZip from "jszip";

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
  candidateList:any;

  constructor(private userService: UserService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService,
    private excelService: ExcelService,
    private router: Router) { }


  ngOnInit() {
    // window.location.href='E:/GitImarkCode/imark/uploads';
    // window.open('file://E:/GitImarkCode/imark/uploads/'); 

    //  const url = window.URL('E:\GitImarkCode\imark\uploads');

    let zipFile: JSZip = new JSZip();

    
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

   download() {
  
  const jszip = new JSZip();
  for(let i=0;i<4;i++){
    jszip.file("smile" + i + ".png", "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", {base64: true});
  }

  jszip.generateAsync({ type: 'blob' }).then(function(content) {
    // see FileSaver.js
    saveAs(content, 'example.zip');
  });
 
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

        if(resp.length){}
        //  this.dtTrigger.next();
        this.candidateList = resp;
        this.excelService.exportAsExcelFile(resp, collegeName + " " + 'candidates Records');
       // console.log(resp, 'Stude list');
        // console.log(this.candidateList[0].cand_image_fold,'this.candidateList');
  for(let i=0;i < this.candidateList.length;i++){
    if(this.candidateList[i].cand_image_base){
  let base64Str =  this.candidateList[i].cand_image_base.split(',');
//  console.log(base64Str,'base64Str');
  //console.log(base64Str[1],'base64Str');
  jszip.file(this.candidateList[i].cand_image_fold + "/"  + this.candidateList[i].cand_image_name + ".png", base64Str[1] , {base64: true});

    }
 
 }
  var folderName = this.candidateList[0].cand_image_fold;
  jszip.generateAsync({ type: 'blob' }).then(function(content) {
    // see FileSaver.js
    saveAs(content, folderName + '.zip');
  });


      },
      error => this.alertService.error(error)
    );

      const jszip = new JSZip();


  }

}
