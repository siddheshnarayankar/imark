import { Component, OnInit, ElementRef, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealerService } from './../dealer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { DeleteDialog, AlertService } from '../../../shared';
import { ExcelService } from './../dealer-org-execel.service';
import { FileUploader } from 'ng2-file-upload';
import * as jwtDecode from "jwt-decode";
const URL: string = "/api/candidates";

@Component({
  selector: 'app-dealer-details',
  templateUrl: './dealer-details.component.html',
  styleUrls: ['./dealer-details.component.scss']
})
export class DealerDetailsComponent implements OnInit {

  candidateForm: FormGroup;
  studentTokenForm: FormGroup;
  get_dealer_org_id: any;
  get_dealer_details: Array<any> = [];
  dtTrigger: Subject<any> = new Subject();
  pickNumber: any;
  curr_token_decoded_id: string;

  students_url: string = '';
  public stud_token_status: boolean = false;

  get_toknes: any;

  getTokensListCountD: any;
  getTokensListCountC: any;

  toggleFlag: boolean = false;


  //New
  collegeDetails:any;
  curr_collegeId:any;

  public uploader: FileUploader = new FileUploader({ url: URL + "/test", itemAlias: 'photo' });

  constructor(
    private fb: FormBuilder,
    private dealerService: DealerService,
    private excelService: ExcelService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService,
    private el: ElementRef) {
  }

  ngOnInit() {
    let curr_token = JSON.parse(localStorage.getItem('userInfo') || '{}');
    let curr_token_decode = jwtDecode(curr_token.token);
    this.curr_token_decoded_id = curr_token_decode._id;

    // Get ID 
    this.activateRoute.params.subscribe(params => {
      this.get_dealer_org_id = params.id;
      this.curr_collegeId = params.id
      console.log(params.id, 'params');

    });


    this.candidateForm = this.fb.group({
      cand_name: '',
      cand_age: '',
      cand_image_fold: '',
      cand_image_name: '',
      cand_org_id: this.get_dealer_org_id
    });
    this.studentTokenForm = this.fb.group({
      stud_count: '',
      stud_token: '',
      stud_org_id: '',
      stud_dealer_id: ''
    });


    this.onDealerDetails();

  }


  onDealerDetails() {
    this.dealerService.getDealerDetails(this.curr_collegeId).subscribe(
      resp => {
        this.collegeDetails = resp;
        
        console.log(this.collegeDetails,'College Details');
       // this.stud_token_status = this.get_dealer_details[0].status;

        
       this.getCurrentTokensCounts();
      this.dtTrigger.next();
      },
      error => this.alertService.error(error)
    );
  }


 

  getCurrentTokens() {
    // this.dealerService.getGenrateTokens(this.curr_collegeId).subscribe(
    //   res => {

    //     this.collegeDetails =  res;
        //console.log(this.collegeDetails[0].stud_token, 'current Tokens');

        //console.log(res[0].stud_uid, 'uid');
        //this.students_url = res.studenttokens[0].stud_uid;
        this.excelService.exportAsExcelFile(this.collegeDetails[0].stud_token, 'Students passcode list');
      //   this.dtTrigger.next();
      // })
  }


  getCurrentTokensCounts() {
      console.log(this.collegeDetails.length);
        if (this.collegeDetails.length) {
          this.getTokensListCountD = this.collegeDetails[0].stud_token.length;
          console.log(this.getTokensListCountD, 'getTokensListCount');

          let s = this.collegeDetails[0].stud_token.filter((item) => {
            if (item.status == true) {
              return true;
            }
          })

          this.getTokensListCountC = s.length;
        
        }
  }

  setStudentTokenStatus() {
    this.dealerService.updateStudentTokenStatus(this.get_dealer_org_id, 'ture').subscribe(
      resp => {
        console.log(resp, 'Studet token genrate College Status True');
      })
  }

  onSubmit(form: FormGroup) {
    // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('Message', form.value.message);

    this.pickNumber = Math.floor((Math.random() * 5000000) + 1);
    this.upload(this.pickNumber);

    //  this.candidateForm.



    form.controls['cand_image_fold'].setValue(this.get_dealer_org_id + this.get_dealer_details[0].name);
    form.controls['cand_image_name'].setValue(this.pickNumber);
    console.log(form);

    this.dealerService.addCandidates(form.value).subscribe(
      resp => {
        console.log('respo', resp);
      },
      error => this.alertService.error(error)
    );


  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];

      reader.readAsDataURL(file);
      console.log(file['name']);
    }
  }

  upload(stdName) {

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    console.log("iam+ " + inputEl.files.item);

    let fileCount: number = inputEl.files.length;

    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('photo', inputEl.files.item(i), this.get_dealer_org_id + '.' + this.get_dealer_details[0].name + '.' + stdName);
        console.log(inputEl.files.item(i).name);
      }

      this.dealerService
        .addImage(formData).map((res: any) => res).subscribe(
        (success) => {
          // alert(success._body);
          return true;
        },
        (error) => alert(error)
        );

    }
  }

  exportToExcel(event) {
    let obj: Array<any> = [];

    this.dealerService.getCandidates(this.get_dealer_org_id).subscribe(
      resp => {
        obj.push(resp);
        console.log('get details', obj);
        this.excelService.exportAsExcelFile(resp, 'this.get_dealer_details[0].name');
        this.dtTrigger.next();
      },
      error => this.alertService.error(error)

    )



  }
}
