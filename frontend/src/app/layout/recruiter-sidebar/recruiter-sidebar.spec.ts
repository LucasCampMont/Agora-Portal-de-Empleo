import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSidebar } from './recruiter-sidebar';

describe('RecruiterSidebar', () => {
  let component: RecruiterSidebar;
  let fixture: ComponentFixture<RecruiterSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(RecruiterSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
