import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ShareDataService } from '../services/share-data.service';
import { Question, Review } from '../models';



@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.css']
})
export class AnswerQuestionsComponent implements OnDestroy, OnChanges {
  @Input() questionList = new Array<Question>();
  answerForm = this.fb.group({
    answers: this.fb.array([
    ])
  });

  private subscription: Subscription | undefined;


  constructor(private fb: FormBuilder, private router: Router, private shareService: ShareDataService) { }


  get addAnswers() {
    return this.answerForm.get('answers') as FormArray;
  }

  ngOnChanges(): void {
    this.subscription = this.shareService.getReviews().subscribe((res) => {
      const reviewData = res;
      if (reviewData.length > 0) {

        this.questionList?.map((question: any) => {
          const exitData = reviewData.filter((val: any) => val.labelName === question.labelName);
          console.log(exitData);
          const group: any = {};
          group.options = new FormArray([]);
          console.warn(question.options);
          question.options.map((opt: any) => {
            if (exitData.length > 0) {
              const exitOption = exitData[0].options.filter((val: any) => val === opt);
              group.options.push(this.fb.control(exitOption[0]));
            } else {
              group.options.push(this.fb.control(''));
            }
          });
          if (question.isAllowOwnAns) {
            group.ownAnswer = new FormControl(exitData.length === 0 ? '' : exitData[0]?.ownAnswer);
          }
          group.paragraph = new FormControl(exitData.length === 0 ? '' : exitData[0]?.paragraph);
          if (question.isRequiredField === true) {
            if (question.questionType === 'Paragraph') {
              group.paragraph.setValidators(Validators.required);
            }
            if (question.questionType === 'Checkbox list') {
              group.options.setValidators(Validators.required);
            }
          }
          this.addAnswers.push(new FormGroup(group));
        });
      } else {
        this.answerForm = this.fb.group({
          answers: this.fb.array([
          ])
        });
        this.questionList.map((question: any) => {
          const group: any = {};
          group.options = new FormArray([]);
          question.options.map(() => {
            const form=group.isRequiredField === true ? this.fb.control('',Validators.required) : this.fb.control('');
            group.options.push(form);
          });
          if (question.isAllowOwnAns) {
            group.ownAnswer = new FormControl('');
          }
          group.paragraph = new FormControl('');
          if (question.isRequiredField === true) {
            if (question.questionType === 'Paragraph') {
              group.paragraph.setValidators(Validators.required);
            }
          }
          this.addAnswers.push(new FormGroup(group));
        });
      }
    });
  }


  getQuestionByIndex(index: any) {
    return this.questionList[index];
  }

  optionByIndex(index: number) {
    return this.addAnswers.at(index).get('options') as FormArray;
  }
  onReview() {
    if (this.answerForm.invalid) {
      return;
    } else {
      const review = this.answerForm.value.answers;
      let reviewData = new Array<Review>();
      if (review) {
        review.map((data: any, index: number) => {
          const tempRev: Review = {
            labelName: this.questionList[index]?.labelName,
            questionType: this.questionList[index]?.questionType,
            paragraph: data.paragraph,
            ownAnswer: data.ownAnswer,
            options: this.questionList[index]?.options.filter((opt: any, i: any) => data.options[i]
            ).map((val: any) => val)
          };
          reviewData.push(tempRev);
        });
        reviewData = reviewData.filter((rev: any) => rev.paragraph || rev?.options?.length);
        this.shareService.addReview(reviewData);
      };
      // localStorage.setItem('review', window.btoa(JSON.stringify(review)));
      this.router.navigateByUrl('form/answers');
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


}
