import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
