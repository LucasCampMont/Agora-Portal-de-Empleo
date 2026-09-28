import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAnswers } from './application-answers';

describe('ApplicationAnswers', () => {
  let component: ApplicationAnswers;
  let fixture: ComponentFixture<ApplicationAnswers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationAnswers],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationAnswers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
