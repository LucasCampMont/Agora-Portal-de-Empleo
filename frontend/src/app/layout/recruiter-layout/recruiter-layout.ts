import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  WorkspaceNavbar,
  type WorkspaceNavbarConfig,
} from '../application/components/workspace-navbar/workspace-navbar';
import { RecruiterSidebar } from '../recruiter-sidebar/recruiter-sidebar';
import { Footer } from '../application/components/footer/footer';

@Component({
  selector: 'app-recruiter-layout',
  imports: [RouterOutlet, WorkspaceNavbar, RecruiterSidebar, Footer],
  templateUrl: './recruiter-layout.html',
  styleUrl: './recruiter-layout.scss',
})
export class RecruiterLayout {
  readonly navbarConfig: WorkspaceNavbarConfig = {
    mode: 'recruiter',
    workspaceName: 'Ágora Demo',
    userName: 'Lucas',
    roleLabel: 'Administrador',
    switchLabel: 'postulante',
    switchPath: '/candidate',
  };

  readonly isSidebarOpen = signal(false);

  toggleSidebar(): void {
    this.isSidebarOpen.update((isOpen) => !isOpen);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}