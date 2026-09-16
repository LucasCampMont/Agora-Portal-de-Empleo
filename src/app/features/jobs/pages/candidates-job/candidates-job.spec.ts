import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesJob } from './candidates-job';

describe('CandidatesJob', () => {
  let component: CandidatesJob;
  let fixture: ComponentFixture<CandidatesJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesJob],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatesJob);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
