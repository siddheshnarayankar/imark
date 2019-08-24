import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsregComponent } from './studentsreg.component'
//  import { StudentsregComponent1 } from './studentsreg1.component'
const routes: Routes = [
  // {path: '', component: StudentsregComponent1} ,
 {path: ':id', component: StudentsregComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsregRoutingModule { }
