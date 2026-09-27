import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SetupSection } from '../../features/candidate/pages/setup/setup';

interface CandidateSidebarItem {
  label: string;
  icon: string;
  exact?: boolean;
  route?: string;
  setupSection?: SetupSection;
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
        { label: 'Empleos recomendados', icon: '✦' },
        { label: 'Empleos guardados', icon: '♡' },
      ],
    },
    {
      label: 'Mis postulaciones',
      items: [
        { label: 'Solicitudes Flash', icon: '⚡' },
        { label: 'Respuestas para postulaciones', icon: '▤' },
        { label: 'Evaluaciones', icon: '◉' },
      ],
    },
    {
      label: 'Perfil profesional',
      items: [
        {
          label: 'Mis CV',
          icon: '▤',
          setupSection: 'cv',
        },
        {
          label: 'Mi perfil',
          icon: '♙',
          setupSection: 'profile',
        },
      ],
    },
    {
      label: 'Ayuda',
      items: [{ label: 'Asistente Ágora', icon: '✦' }],
    },
  ];

  openSetup(section: SetupSection): void {
    this.setupRequested.emit(section);
  }
}