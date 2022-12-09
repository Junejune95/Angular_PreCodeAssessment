import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

import { Question,Review } from '../models/index';



@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
     //array behind the questions
  questionList: Question[] = new Array<Question>();
  reviewList: Review[] = new Array<Review>() ;

  private questions=new Subject<Question[]>();
  private reviews=new Subject<Review[]>();



  constructor() {
    this.questions = new BehaviorSubject<Question[]>(new Array<Question>());
    this.reviews = new BehaviorSubject<Review[]>(new Array<Review>());
  }

  addQuestion(ques: Question[]){
    this.questionList=[...this.questionList, ...ques];
    this.questions.next(this.questionList);
  }

  getQuestions(): Subject<Question[]> {
    return this.questions;
  }

  addReview(review: Review[]){
    this.reviewList=review;

    this.reviews.next(this.reviewList);
  }

  getReviews(): Subject<Review[]> {
    return this.reviews;
  }


}
