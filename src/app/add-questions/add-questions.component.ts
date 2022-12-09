import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ShareDataService } from '../services/share-data.service';
import { Question } from '../models/question';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit, OnDestroy {
  public isEmpty = true;
  public questionList = new Array<Question>();
  public questionTypes = ['Paragraph', 'Checkbox list'];
  public selectedType: 'Paragraph' | 'Checkbox list' = 'Paragraph';
  questionForm = this.fb.group({
    questions: this.fb.array([
      this.newQuestion()
    ])
  });

  private subscription?: Subscription;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private shareService: ShareDataService) {
    // this.cdRef.detectChanges();
    // this.getQuestion();
  }



  get addQuestion() {
    return this.questionForm.get('questions') as FormArray;
  }

  ngOnInit(): void {
    this.getQuestion();
    // const question = localStorage.getItem('questions');
    // if (question) {
    //   this.questionList = JSON.parse(window.atob(question));
    // console.log(this.questionList);
    // }

  }


  getQuestion() {
    this.subscription = this.shareService.getQuestions().subscribe((res) => {
      this.questionList = res;
      this.isEmpty = this.questionList.length === 0 ? true : false;

    });
  }

  optionByQuestionIndex(index: number) {
    return this.addQuestion.at(index).get('options') as FormArray;

  }

  newQuestion(): FormGroup {
    return this.fb.group({
      labelName: ['', [Validators.required]],
      questionType: ['Paragraph'],
      isAllowOwnAns: [false],
      isRequiredField: [false],
      options: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
      ])
    });
  }

  addOptions(index: number) {
    // if(this.optionByQuestionIndex(index).length<4){
    this.optionByQuestionIndex(index).push(this.fb.control(''));
    // }

  }

  openQuestionModal(content: any) {
    this.questionForm.reset();
    this.selectedType = 'Paragraph';
    this.questionForm = this.fb.group({
      questions: this.fb.array([
        this.newQuestion()
      ])
    });
    this.modalService.open(content, { size: 'lg' });
  }

  onselectedType(e: any) {
    this.selectedType = e.target.value;
  }
  onSubmit() {
    if (this.questionForm.invalid) {
      return;
    }
    if (this.questionForm.value.questions) {
      const question = this.questionForm.value;
      if (question.questions) {
        question.questions.map((data: any) => {
          if (data.isAllowOwnAns === true) {
            data.options.push('Other');
            data.ownAnswer = '';
          }
        });
        this.shareService.addQuestion(this.questionForm.value.questions);
      };

      // this.questionList = [...this.questionList, ...this.questionForm.value.questions];

      this.modalService.dismissAll();
    }
    // localStorage.setItem('questions', window.btoa(JSON.stringify(this.questionList)));

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}


