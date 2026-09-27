import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type SidebarItem = {
  label: string;
  path?: string;
  icon: string;
  disabled?: boolean;
};

type SidebarGroup = {
  label: string;
  items: SidebarItem[];
};

@Component({
  selector: 'app-recruiter-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './recruiter-sidebar.html',
})
export class RecruiterSidebar {
  readonly groups: SidebarGroup[] = [
    {
      label: 'RECLUTAMIENTO',
      items: [
        { label: 'Panel', path: '/recruiter', icon: 'P' },
        { label: 'Vacantes', path: '/recruiter/vacantes', icon: 'V' },
        { label: 'Postulaciones', icon: 'A', disabled: true },
        { label: 'Base de talento', icon: 'T', disabled: true },
      ],
    },
    {
      label: 'ORGANIZACIÓN',
      items: [
        { label: 'Equipo', icon: 'E', disabled: true },
        { label: 'Configuración', icon: 'C', disabled: true },
      ],
    },
  ];
}