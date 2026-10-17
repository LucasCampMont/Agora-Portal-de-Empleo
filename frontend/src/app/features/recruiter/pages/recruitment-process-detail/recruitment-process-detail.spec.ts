import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentProcessDetail } from './recruitment-process-detail';

describe('RecruitmentProcessDetail', () => {
  let component: RecruitmentProcessDetail;
  let fixture: ComponentFixture<RecruitmentProcessDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentProcessDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(RecruitmentProcessDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
