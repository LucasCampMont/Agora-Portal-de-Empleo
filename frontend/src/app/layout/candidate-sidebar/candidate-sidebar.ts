import { Component, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SetupSection } from '../../features/candidate/pages/setup/setup';

interface CandidateSidebarItem {
  label: string;
  icon: string;
  exact?: boolean;
  route?: string;
  queryParams?: Record<string, string>;
  setupSection?: SetupSection;
  badge?: number;
}

interface CandidateSidebarSection {
  label: string;
  items: CandidateSidebarItem[];
}

@Component({
  selector: 'app-candidate-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './candidate-sidebar.html',
  styleUrl: './candidate-sidebar.scss',
})
export class CandidateSidebar {
  readonly setupRequested = output<SetupSection>();

  readonly collapsed = signal(false);

  readonly sections: CandidateSidebarSection[] = [
    {
      label: 'Empleos',
      items: [
        {
          label: 'Buscar empleos',
          icon: '⌕',
          exact: true,
          route: '/candidate/jobs',
        },
        {
          label: 'Empleos guardados',
          icon: '♡',
          route: '/candidate/jobs',
          queryParams: {
            tab: 'saved',
          },
        },
        {
          label: 'Empleos recomendados',
          icon: '✦',
          route: '/candidate/recommended',
        },
      ],
    },

    {
      label: 'Postulaciones',
      items: [
        {
          label: 'Mis postulaciones',
          icon: '▣',
          route: '/candidate/applications',
        },
        {
          label: 'Solicitudes Flash',
          icon: '⚡',
          route: '/candidate/flash-requests',
          badge: 2,
        },
        {
          label: 'Evaluaciones',
          icon: '◉',
          route: '/candidate/evaluations',
          badge: 2,
        },
        {
          label: 'Formularios y respuestas',
          icon: '▤',
          route: '/candidate/answers',
        },
      ],
    },

    {
      label: 'Perfil profesional',
      items: [
        {
          label: 'Mi perfil',
          icon: '♙',
          setupSection: 'profile',
        },
        {
          label: 'Mis CV',
          icon: '▤',
          setupSection: 'cv',
        },
      ],
    },

    {
      label: 'Herramientas',
      items: [
        {
          label: 'Asistente Ágora',
          icon: '✦',
          route: '/candidate/assistant',
        },
      ],
    },
  ];

  toggleSidebar(): void {
    this.collapsed.update((value) => !value);
  }

  openSetup(section: SetupSection): void {
    this.setupRequested.emit(section);
  }
}