import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddQuestionsComponent } from './add-questions/add-questions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'questions',
    pathMatch: 'full'
  },
  {
    path: 'questions',
    component: AddQuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
