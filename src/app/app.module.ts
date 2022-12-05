import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AnswerQuestionsComponent } from './answer-questions/answer-questions.component';
import { ReviewAnswersComponent } from './review-answers/review-answers.component';

@NgModule({
  declarations: [
    AppComponent,
    AddQuestionsComponent,
    AnswerQuestionsComponent,
    ReviewAnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
