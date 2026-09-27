import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type WorkspaceNavbarMode = 'candidate' | 'recruiter';

export interface WorkspaceNavbarConfig {
  mode: WorkspaceNavbarMode;
  workspaceName: string;
  userName: string;
  roleLabel: string;
  switchLabel: string;
  switchPath: string;
}

@Component({
  selector: 'app-workspace-navbar',
  imports: [RouterLink],
  templateUrl: './workspace-navbar.html',
  styleUrl: './workspace-navbar.scss',
})
export class WorkspaceNavbar {
  readonly config = input.required<WorkspaceNavbarConfig>();

  readonly accentColor = computed(() =>
    this.config().mode === 'recruiter' ? '#164E63' : '#0A9292',
  );
}