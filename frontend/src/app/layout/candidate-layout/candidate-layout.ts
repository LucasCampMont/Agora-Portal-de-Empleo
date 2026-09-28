import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../application/components/navbar/navbar';
import { CandidateSidebar } from '../candidate-sidebar/candidate-sidebar';
import { Footer } from '../application/components/footer/footer';
import { Setup } from '../../features/candidate/pages/setup/setup';
import type { SetupSection } from '../../features/candidate/pages/setup/setup';
import { CandidateWindowService } from './candidate-windows.service';
import { SavedJobsModal } from '../../features/candidate/components/saved-jobs-modal/saved-jobs-modal';

@Component({
  selector: 'app-candidate-layout',
  imports: [
    Navbar,
    CandidateSidebar,
    RouterOutlet,
    Footer,
    Setup,
    SavedJobsModal,
  ],
  templateUrl: './candidate-layout.html',
  styleUrl: './candidate-layout.scss',
})
export class CandidateLayout {
  private readonly windowService = inject(CandidateWindowService);

  readonly setupModalSection = signal<SetupSection | null>(null);

  readonly activeWindow = this.windowService.activeWindow;

  openSetupModal(section: SetupSection): void {
    this.setupModalSection.set(section);
  }

  closeSetupModal(): void {
    this.setupModalSection.set(null);
  }

  closeWindow(): void {
    this.windowService.close();
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.closeSetupModal();
    this.closeWindow();
  }
}