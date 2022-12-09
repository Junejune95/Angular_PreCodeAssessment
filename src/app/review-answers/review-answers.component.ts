import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ShareDataService } from '../services/share-data.service';
import { Review } from '../models/index';


@Component({
  selector: 'app-review-answers',
  templateUrl: './review-answers.component.html',
  styleUrls: ['./review-answers.component.css']
})
export class ReviewAnswersComponent implements OnInit, OnDestroy {
  public reviews=new Array<Review>();
  private subscription: Subscription | undefined;

  constructor(private loc: Location,private shareDataService: ShareDataService,private router: Router) { }

  ngOnInit(): void {
    this.getReivewData();

  }

  getReivewData(){
    this.subscription=this.shareDataService.getReviews()
    .subscribe((res: Review[])=>{
      if(res.length===0){
        this.router.navigateByUrl('form/builder');
      }
      this.reviews=res;
    });
  }

  backPrev(){
    this.loc.back();
  }

  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
  }

}
