import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterVacancies } from './recruiter-vacancies';

describe('RecruiterVacancies', () => {
  let component: RecruiterVacancies;
  let fixture: ComponentFixture<RecruiterVacancies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterVacancies],
    }).compileComponents();

    fixture = TestBed.createComponent(RecruiterVacancies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
