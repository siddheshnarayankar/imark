import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsregComponent } from './studentsreg.component'
 
const routes: Routes = [
 {path: 'new/:id', component: StudentsregComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsregRoutingModule { }
