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
  selector: 'app-studentsreg1',
  templateUrl: './studentsreg1.component.html',
  styleUrls: ['./studentsreg.component.scss']
})
export class StudentsregComponent1 implements OnInit {
   
    collegeList:any;

    constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, private el: ElementRef, private studentsregService: StudentsregService,
    private alertService: AlertService) { }

  
  ngOnInit() {
          this.studentsregService.getCollegeList().subscribe(
      resp => {
        console.log('respo', resp);
        this.collegeList = resp;
        // this.alertService.success('Submitted Successfully :)')
      },
      error => this.alertService.error(error)
    );
     

  }


   
}
