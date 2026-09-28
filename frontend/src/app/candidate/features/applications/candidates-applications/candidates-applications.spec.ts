import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesApplications } from './candidates-applications';

describe('CandidatesApplications', () => {
  let component: CandidatesApplications;
  let fixture: ComponentFixture<CandidatesApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesApplications],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatesApplications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
