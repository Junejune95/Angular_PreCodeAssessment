import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.css']
})
export class AnswerQuestionsComponent implements OnInit {
  @Input() questionList: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.questionList);
  }

}
