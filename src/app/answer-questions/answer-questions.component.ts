import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.css']
})
export class AnswerQuestionsComponent implements OnInit, OnDestroy {
  @Input() questionList: any;
  subscription: Subscription | undefined;

  answerForm = this.fb.group({
    answers: this.fb.array([
    ])
  });


  constructor(private fb: FormBuilder, private router: Router) { }

  get addAnswers() {
    return this.answerForm.get('answers') as FormArray;
  }

  ngOnInit(): void {
    console.log(this.questionList);
    const reviewData = localStorage.getItem('review');
    if (reviewData) {
      const data = JSON.parse(window.atob(reviewData)).answers;
      this.questionList.map((question: any) => {
        const exitData = data.filter((val: any) => val.labelName === question.labelName);
        const group: any = {};
        group.options = new FormArray([]);
        question.options.map((opt: any) => {
          if (exitData.length > 0) {
            const exitOption = exitData[0].options.filter((val: any) => val === opt);

            group.options.push(this.fb.control(exitOption[0]));

          } else {

            group.options.push(this.fb.control(''));
          }

        });
        if(question.isAllowOwnAns){
          group.ownAnswer = new FormControl(exitData.length === 0 ? '' : exitData[0].ownAnswer);
        }
        group.paragraph = new FormControl(exitData.length === 0 ? '' : exitData[0].paragraph);
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
      this.questionList.map((question: any) => {
        const group: any = {};
        group.options = new FormArray([]);
        question.options.map(() => {
          group.options.push(this.fb.control(''));
        });
        console.log(question);
        if(question.isAllowOwnAns){
          group.ownAnswer = new FormControl('');
        }
        group.paragraph = new FormControl('');
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
    }


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
    }
    const review = this.answerForm.value;
    if (review.answers) {
      review.answers.map((data: any, index: number) => {
        data.labelName = this.questionList[index].labelName;
        data.questionType = this.questionList[index].questionType;
        data.labelName = this.questionList[index].labelName;
        data.options = this.questionList[index].options.filter((opt: any, i: any) => data.options[i]
        ).map((val: any) => val);
      });
      review.answers = review.answers.filter((rev: any) => rev.paragraph || rev.options.length);
    };


    localStorage.setItem('review', window.btoa(JSON.stringify(review)));
    this.router.navigateByUrl('form/answers');
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


}
