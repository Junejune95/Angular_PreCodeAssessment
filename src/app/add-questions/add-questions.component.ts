import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  public isEmpty = true;
  public questionList: any=[];

  questionForm = this.fb.group({
    questions: this.fb.array([
      this.newQuestion()
    ])
  });

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
  }


  get addQuestion() {
    return this.questionForm.get('questions') as FormArray;
  }

  ngOnInit(): void {
    const question = localStorage.getItem('questions');
    this.isEmpty = question ? false : true;
    if(question){
      this.questionList=JSON.parse(window.atob(question));
    }
    console.log(this.questionList);

  }

  optionByQuestionIndex(index: number) {
    return this.addQuestion.at(index).get('options') as FormArray;

  }

  newQuestion(): FormGroup {
    return this.fb.group({
      checkbox: [''],
      typeQuestion: [''],
      isAllowOwnAns: [false],
      isRequiredField: [false],
      options: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
      ])
    });
  }

  addOptions(index: number) {
    this.optionByQuestionIndex(index).push(this.fb.control(''));
  }


  openQuestionModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  onSubmit() {
    this.questionList.push(this.questionForm.value);
    localStorage.setItem('questions', window.btoa(JSON.stringify(this.questionList)));
    this.modalService.dismissAll();
  }

}


