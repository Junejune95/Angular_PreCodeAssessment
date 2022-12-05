import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewAnswersComponent } from './review-answers/review-answers.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form/builder',
    pathMatch: 'full'
  },
  {
    path: 'form/builder',
    component: AddQuestionsComponent
  },
  {
    path: 'form/answers',
    component: ReviewAnswersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
