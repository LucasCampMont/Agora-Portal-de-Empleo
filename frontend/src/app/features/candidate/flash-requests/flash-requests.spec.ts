import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashRequests } from './flash-requests';

describe('FlashRequests', () => {
  let component: FlashRequests;
  let fixture: ComponentFixture<FlashRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashRequests],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashRequests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
