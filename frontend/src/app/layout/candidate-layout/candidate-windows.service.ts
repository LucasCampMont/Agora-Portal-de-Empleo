import { Injectable, signal } from '@angular/core';

export type CandidateWindow =
  | 'saved'
  | 'applications'
  | 'answers'
  | 'flash'
  | 'evaluations'
  | null;

@Injectable({
  providedIn: 'root',
})
export class CandidateWindowService {
  private readonly activeWindowState = signal<CandidateWindow>(null);

  readonly activeWindow = this.activeWindowState.asReadonly();

  open(window: Exclude<CandidateWindow, null>): void {
    this.activeWindowState.set(window);
  }

  close(): void {
    this.activeWindowState.set(null);
  }
}