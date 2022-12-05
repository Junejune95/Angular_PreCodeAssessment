// eslint-disable-next-line import/no-unresolved
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddQuestionsComponent } from './add-questions.component';

describe('AddQuestionsComponent', () => {
  let component: AddQuestionsComponent;
  let fixture: ComponentFixture<AddQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQuestionsComponent],
      imports: [ReactiveFormsModule]

    })
      .compileComponents();

    fixture = TestBed.createComponent(AddQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
