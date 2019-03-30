import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsregService } from './studentsreg.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { DeleteDialog, AlertService } from '../shared';
//import { ExcelService } from './../dealer-org-execel.service';
import { FileUploader } from 'ng2-file-upload';
import * as jwtDecode from "jwt-decode";

@Component({
  selector: 'app-studentsreg',
  templateUrl: './studentsreg.component.html',
  styleUrls: ['./studentsreg.component.scss']
})
export class StudentsregComponent implements OnInit {
  loginStudForm: FormGroup;
  candidateForm: FormGroup;

  get_dealer_org_id: any;
  get_dealer_details: any;
  dtTrigger: Subject<any> = new Subject();
  pickNumber: any;
  curr_token_decoded_id: string;

  isValidLogin: boolean = false;

  public uploader: FileUploader = new FileUploader({ url: URL + "/test", itemAlias: 'photo' });

  constructor(private fb: FormBuilder, private el: ElementRef, private studentsregService: StudentsregService,
    private alertService: AlertService) { }



  ngOnInit() {



    this.loginStudForm = this.fb.group({
      std_id: '',
      std_passcode: ''
    })


    this.candidateForm = this.fb.group({
      cand_name: '',
      cand_age: '',
      cand_image_fold: '',
      cand_image_name: '',
      cand_org_id: '',
      cand_dealer_id:''
    });
  }


  onCandidateForm(form: FormGroup) {
    // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('Message', form.value.message);
    this.pickNumber = Math.floor((Math.random() * 5000000) + 1);
    this.upload(this.pickNumber);




    form.controls['cand_dealer_id'].setValue(this.get_dealer_details.curr_dealer_id);
    form.controls['cand_org_id'].setValue(this.get_dealer_org_id);
    form.controls['cand_image_fold'].setValue(this.get_dealer_org_id + this.get_dealer_details.name);
    form.controls['cand_image_name'].setValue(this.pickNumber);
    //  this.candidateForm.




    console.log(form);

    this.studentsregService.addCandidates(form.value).subscribe(
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

    console.log(this.get_dealer_details[0],'First');
    console.log(this.get_dealer_details,'second');

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    console.log("iam+ " + inputEl.files.item);

    let fileCount: number = inputEl.files.length;

    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('photo', inputEl.files.item(i), this.get_dealer_org_id + '.' + this.get_dealer_details.name + '.' + stdName);
        console.log(inputEl.files.item(i).name);
      }

      this.studentsregService
        .addImage(formData).map((res: any) => res).subscribe(
        (success) => {
          // alert(success._body);
          return true;
        },
        (error) => alert(error)
        );

    }
  }


  getCurrentOrgDetails() {
    this.studentsregService.getCurrentOrgDetails(this.get_dealer_org_id).subscribe(
      resp => {
        this.get_dealer_details = resp;
        console.log(this.get_dealer_details, 'Detaails');


      },
      error => this.alertService.error(error)
    )
  }
  onStudentLogin(form: FormGroup) {

    let uidarr = form.value.std_id.split('.');

    this.get_dealer_org_id = uidarr[1];
    console.log(uidarr[0]);
    this.studentsregService.get(uidarr[0], uidarr[1], form.value.std_passcode).subscribe(
      resp => {

        if (resp.length) {
          this.isValidLogin = true;
          this.getCurrentOrgDetails();
          console.log('True');
        } else {
          this.isValidLogin = false;
          console.log('Fail');
        }

        console.log('res', resp);
      },
      error => this.alertService.error(error)
    )
  }

}
