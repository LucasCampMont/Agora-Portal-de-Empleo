import { Component } from '@angular/core';

@Component({
  selector: 'app-candidates-job',
  imports: [],
  templateUrl: './candidates-job.html',
  styleUrl: './candidates-job.scss',
})
export class CandidatesJob {

    showFilters = false;

    toggleFilters(): void {
        this.showFilters = !this.showFilters;
    }



}
