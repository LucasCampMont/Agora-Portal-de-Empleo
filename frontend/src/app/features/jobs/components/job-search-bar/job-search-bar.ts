import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-job-search-bar',
  standalone: true,
  templateUrl: './job-search-bar.html',
})
export class JobSearchBar {
  readonly searchRequested = output<string>();
  readonly query = signal('');

  updateQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  submitSearch(event: Event): void {
    event.preventDefault();

    const query = this.query().trim();

    if (query) {
      this.searchRequested.emit(query);
    }
  }
}