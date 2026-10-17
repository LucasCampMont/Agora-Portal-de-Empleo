import { Component, inject, output } from '@angular/core';

import { CandidateWindowService } from '../../../../layout/candidate-layout/candidate-windows.service';

@Component({
  selector: 'app-candidate-home',
  imports: [],
  templateUrl: './candidate-home.html',
})
export class CandidateHome {
  private readonly windowService = inject(CandidateWindowService);

  readonly profileRequested = output<void>();

  openSavedJobs(): void {
    this.windowService.open('saved');
  }

  openProfile(): void {
    this.profileRequested.emit();
  }
}