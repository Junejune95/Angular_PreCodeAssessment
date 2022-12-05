import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  public isEmpty = true;
  public questionList: any = [];
  public questionTypes = ['Paragraph', 'Checkbox list'];
  public selectedType: 'Paragraph' | 'Checkbox list' = 'Paragraph';

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
    if (question) {
      this.questionList = JSON.parse(window.atob(question));
    }

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
    if(this.optionByQuestionIndex(index).length<=5){
      this.optionByQuestionIndex(index).push(this.fb.control(''));
    }

  }


  openQuestionModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  onselectedType(e: any) {
    console.log(e.target.value);
    this.selectedType = e.target.value;
  }
  onSubmit() {
    if (this.questionForm.invalid) {
      return;
    }
    if (this.questionForm.value.questions) {
      this.questionList = [...this.questionList, ...this.questionForm.value.questions];
    }

    // this.isEmpty=false;
    window.location.reload();
    localStorage.setItem('questions', window.btoa(JSON.stringify(this.questionList)));
    this.modalService.dismissAll();
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.questionForm = this.fb.group({
      questions: this.fb.array([
        this.newQuestion()
      ])
    });
  }

}


