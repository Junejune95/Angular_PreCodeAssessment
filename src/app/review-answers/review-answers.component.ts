import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review-answers',
  templateUrl: './review-answers.component.html',
  styleUrls: ['./review-answers.component.css']
})
export class ReviewAnswersComponent implements OnInit {
  public reviews: any;
  constructor(private loc: Location) { }

  ngOnInit(): void {
    const tempReview=localStorage.getItem('review');
    if( tempReview!= null){
      this.reviews=JSON.parse(window.atob(tempReview)).answers;
    }

    console.log(this.reviews);

  }

  backPrev(){
    this.loc.back();
  }

}
