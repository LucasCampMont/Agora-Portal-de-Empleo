import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentPipeline } from './recruitment-pipeline';

describe('RecruitmentPipeline', () => {
  let component: RecruitmentPipeline;
  let fixture: ComponentFixture<RecruitmentPipeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentPipeline],
    }).compileComponents();

    fixture = TestBed.createComponent(RecruitmentPipeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
