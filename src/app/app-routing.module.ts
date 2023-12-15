import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckinComponent } from './checkin/checkin.component';
import { LuckydrawComponent } from './luckydraw/luckydraw.component';

const routes: Routes = [
  { path: 'checkin', component: CheckinComponent },
  { path: 'luckydraw', component: LuckydrawComponent },
  { path: '', redirectTo: 'checkin', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
