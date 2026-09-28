import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CandidateWindowService } from '../../../../layout/candidate-layout/candidate-windows.service';

@Component({
  selector: 'app-candidate-home',
  imports: [RouterLink],
  templateUrl: './candidate-home.html',
  styleUrl: './candidate-home.scss',
})
export class CandidateHome {
  private readonly windowService = inject(CandidateWindowService);

  openSavedJobs(): void {
    this.windowService.open('saved');
  }
}