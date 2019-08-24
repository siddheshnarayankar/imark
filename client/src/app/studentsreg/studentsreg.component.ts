import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { StudentsregService } from './studentsreg.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { DeleteDialog, AlertService } from '../shared';
//import { ExcelService } from './../dealer-org-execel.service';
// import { FileUploader } from 'ng2-file-upload';
import * as jwtDecode from "jwt-decode";
import Swal from 'sweetalert2'

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
  current_uidarr: any;





  //New 
  orgURLPrfix: any;
  orgURLName:any;
  isSave:boolean = false;
  candCurrentId:any;
  isImgUpload:boolean = false;
  currentPasscode:any;
  imageSrc:any;
  // public uploader: FileUploader = new FileUploader({ url: URL + "/test", itemAlias: 'photo' });

  constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, private el: ElementRef, private studentsregService: StudentsregService,
    private alertService: AlertService) { }



  ngOnInit() {

    this.activateRoute.params.subscribe(params => {
      this.orgURLName = params.id;
      console.log(params.id, 'params');
    });


    this.studentsregService.getURLPrfix(this.orgURLName)
    .subscribe(res => {
      if(res.length){
       console.log(res,'this.orgURLPrfix')  
         this.orgURLPrfix = res[0].orgURLPrfix; 
      }
      else{
          this.alertService.errorValid('College URL invalid');
      }
    })


    this.loginStudForm = this.fb.group({
      std_id: '',
      std_passcode: ''
    })


    this.candidateForm = this.fb.group({
      cand_firstName: new FormControl('', Validators.required),
      cand_MiddleName: new FormControl(''),
      cand_LastName: new FormControl('', Validators.required),
      cand_DOB: new FormControl('', Validators.required),
      cand_age: new FormControl(''),
      cand_blood_group: new FormControl(''),
      cand_gender: new FormControl('', Validators.required),
      cand_phoneNumber: new FormControl(''),       
      cand_image_fold: '',
      cand_image_name: '',
      cand_image_base:'',
      cand_org_id: '',
      cand_dealer_id: ''
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.candidateForm.controls[controlName].hasError(errorName);
  }

  //For Update 
  onCandidateUpdate(form: FormGroup){

  
  if(this.isImgUpload){
    this.isImgUpload = false;
    this.pickNumber = Math.floor((Math.random() * 5000000) + 1);
    this.upload(this.pickNumber);
   }
     if (form.valid) {

    form.controls['cand_image_name'].setValue(this.pickNumber);
    this.studentsregService.updateCandidates(this.candCurrentId,form.value).subscribe(
      resp=>{
          console.log(resp,'resp')
      }
    )

    }
 else{
      console.log('asd')
		  this.alertService.errorValid('Enter Required Fields *');
	  }
  }

  // For Save 
  onCandidateForm(form: FormGroup) {
    // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('Message', form.value.message);
    if(this.isImgUpload){
    this.isImgUpload = false;
    this.pickNumber = Math.floor((Math.random() * 5000000) + 1);
    this.upload(this.pickNumber);
    }


if (form.valid) {
    form.controls['cand_dealer_id'].setValue(this.get_dealer_details.dealer_id);
    form.controls['cand_org_id'].setValue(this.orgURLPrfix);
    form.controls['cand_image_fold'].setValue(this.orgURLPrfix + this.get_dealer_details.orgName);
    form.controls['cand_image_name'].setValue(this.pickNumber);
     form.controls['cand_image_base'].setValue(this.imageSrc);
    
    //  this.candidateForm.



    // console.log(form);

    this.studentsregService.addCandidates(form.value).subscribe(
      resp => {
        this.candCurrentId = resp.candidate._id;
        console.log('respo', this.candCurrentId);
        this.setStatusFalg(this.orgURLPrfix, this.currentPasscode);

      this.isSave = true;
        // this.alertService.success('Submitted Successfully :)')
		Swal.fire({
			title: '',
			text: 'Data Upload Successfully',
			type: 'success',
			showCancelButton: false,
			confirmButtonText: 'Yes',
		})
      },
      error => this.alertService.error(error)
    );
}
 else{
      console.log('asd')
		  this.alertService.errorValid('Enter Required Fields *');
	  }

  }



  onFileChange(event) {
    
    this.isImgUpload = true;
    console.log(event);
    let reader = new FileReader();
      var pattern = /image-*/;

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
   if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
      console.log(file['name']);
    }
  }

  _handleReaderLoaded(e) {
    let reader = e.target;

    this.imageSrc = reader.result;


    console.log(this.imageSrc)
  }

  upload(stdName) {

    console.log(this.get_dealer_details[0], 'First');
    console.log(this.get_dealer_details, 'second');

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    console.log("iam+ " + inputEl.files.item);

    let fileCount: number = inputEl.files.length;

    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('photo', inputEl.files.item(i), this.orgURLPrfix + '.' + this.get_dealer_details.orgName + '.' + stdName);
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

  setStatusFalg(orgURLPrfix, passcode) {
    this.studentsregService.setStatusFlag(orgURLPrfix,passcode).subscribe(
      resp => {
          console.log(resp);
      }
    )
  }

  getCurrentOrgDetails() {
    this.studentsregService.getCurrentOrgDetails(this.orgURLPrfix).subscribe(
      resp => {
        this.get_dealer_details = resp;
        console.log(this.get_dealer_details, 'Detaails');
      },
      error => this.alertService.error(error)
    )
  }


  onStudentLogin(form: FormGroup) {

    // let uidarr = form.value.std_id.split('.');
    // this.current_uidarr = form.value.std_id.split('.');
    // this.get_dealer_org_id = uidarr[1];
    // console.log(uidarr[0]);
    

    // if (uidarr[0].length) {



      this.studentsregService.get(this.orgURLPrfix, form.value.std_passcode).subscribe(
        resp => {
          console.log('res', resp);
          if (resp.length) {
            //  console.log(resp[0].stud_token[0].status, 'login details');
            if (resp[0].stud_token.length && resp[0].stud_token[0].status === true) {
              this.isValidLogin = true;
              this.currentPasscode = form.value.std_passcode;
               this.getCurrentOrgDetails();
              console.log('True');
            } else {
              this.isValidLogin = false;

              this.alertService.info('Token used');

            }
          } else {
              this.alertService.errorValid('Invalid Entery');
            
          }


          console.log('res', resp);
        },
        error => this.alertService.error(error)
      )
    // } else {
    //   this.alertService.info('Enter User Id and password')
    // }
  }

}
