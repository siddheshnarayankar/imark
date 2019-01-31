import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealerService } from './../dealer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { DeleteDialog, AlertService } from '../../../shared';
import { ExcelService } from './../dealer-org-execel.service';
import { FileUploader } from 'ng2-file-upload';

const URL: string = "/api/candidates";

@Component({
  selector: 'app-dealer-details',
  templateUrl: './dealer-details.component.html',
  styleUrls: ['./dealer-details.component.scss']
})
export class DealerDetailsComponent implements OnInit {

  candidateForm: FormGroup;
  get_dealer_org_id: any;
  get_dealer_details: Array<any> = [];
  dtTrigger: Subject<any> = new Subject();


  public uploader: FileUploader = new FileUploader({ url: URL + "/test", itemAlias: 'photo' });

  constructor(
    private fb: FormBuilder,
    private dealerService: DealerService,
    private excelService: ExcelService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService,
    private el: ElementRef) { }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    console.log('tets', this.uploader);
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      // alert('File uploaded successfully');
    };

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
      cand_image:'',
      cand_org_id: this.get_dealer_org_id
    });

    console.log(this.get_dealer_details);

  }

  onSubmit(form: FormGroup) {
    // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('Message', form.value.message);
 
 

    this.dealerService.addCandidates(form.value).subscribe(
      resp => {
        console.log('respo', resp);
      },
      error => this.alertService.error(error)
    );


  }

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    console.log("iam+ " + inputEl);
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('photo', inputEl.files.item(i));
      }
       
      this.dealerService
        .addImage(formData).map((res: any) => res).subscribe(
        (success) => {
          alert(success._body);
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
