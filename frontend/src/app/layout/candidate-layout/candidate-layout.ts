import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../application/components/navbar/navbar';
import { CandidateSidebar } from '../candidate-sidebar/candidate-sidebar';
import { Footer } from '../application/components/footer/footer';
import { Setup } from '../../features/candidate/pages/setup/setup';
import type { SetupSection } from '../../features/candidate/pages/setup/setup';

@Component({
  selector: 'app-candidate-layout',
  imports: [
    Navbar,
    CandidateSidebar,
    RouterOutlet,
    Footer,
    Setup,
  ],
  templateUrl: './candidate-layout.html',
  styleUrl: './candidate-layout.scss',
})
export class CandidateLayout {
  readonly setupModalSection = signal<SetupSection | null>(null);

  openSetupModal(section: SetupSection): void {
    this.setupModalSection.set(section);
  }

  closeSetupModal(): void {
    this.setupModalSection.set(null);
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.closeSetupModal();
  }
}