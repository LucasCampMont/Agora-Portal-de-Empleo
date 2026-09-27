import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceNavbar } from './workspace-navbar';

describe('WorkspaceNavbar', () => {
  let component: WorkspaceNavbar;
  let fixture: ComponentFixture<WorkspaceNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
