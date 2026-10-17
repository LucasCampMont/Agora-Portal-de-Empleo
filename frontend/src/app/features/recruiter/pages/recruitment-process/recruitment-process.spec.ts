import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentProcess } from './recruitment-process';

describe('RecruitmentProcess', () => {
  let component: RecruitmentProcess;
  let fixture: ComponentFixture<RecruitmentProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentProcess],
    }).compileComponents();

    fixture = TestBed.createComponent(RecruitmentProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
