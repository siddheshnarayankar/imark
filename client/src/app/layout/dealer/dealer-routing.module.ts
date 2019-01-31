import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelearComponent } from './dealer.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';

const routes: Routes = [
 {path: '', component: DelearComponent} ,
 {path: 'dealer-details/:id', component: DealerDetailsComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
