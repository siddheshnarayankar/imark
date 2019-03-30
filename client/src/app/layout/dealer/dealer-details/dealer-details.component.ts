import { Component, OnInit, ElementRef, Input } from '@angular/core';
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

  students_url:string ='';
 

  get_toknes: any;

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
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
// this.students_url = "Hello";
    // console.log('tets', this.uploader);
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    //   // alert('File uploaded successfully');
    // };

    // Get ID 
    this.activateRoute.params.subscribe(params => {
      this.get_dealer_org_id = params.id;
      console.log(params.id, 'params');

    });

    this.dealerService.getDealerDetails(this.get_dealer_org_id).subscribe(
      resp => {
        this.get_dealer_details.push(resp);
        this.dtTrigger.next();
      },
      error => this.alertService.error(error)
    );


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

    console.log(this.get_dealer_details);

    // this.getCurrentTokens();
  }

  onStudentTokenGenerate(form: FormGroup) {
    let stud_randNo;

    form.controls['stud_dealer_id'].setValue(this.curr_token_decoded_id);
    form.controls['stud_org_id'].setValue(this.get_dealer_org_id);


    this.dealerService.genrateToken(form.value)
      .subscribe(
      resp => {
        console.log(resp);

        // this.get_toknes.push(resp);

        // this.excelService.exportAsExcelFile(resp, 'this.get_dealer_details[0].name');
        this.getCurrentTokens();
      },
      error => this.alertService.error(error)
      );

  }

  getCurrentTokens() {
    this.dealerService.getGenrateTokens(this.get_dealer_org_id).subscribe(
      res => {
        console.log(res,'current Tokens');
        console.log(res[0].stud_uid,'uid');
        this.students_url=res[0].stud_uid;
        this.excelService.exportAsExcelFile(res[0].stud_token, 'Students passcode list');
        this.dtTrigger.next();
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
