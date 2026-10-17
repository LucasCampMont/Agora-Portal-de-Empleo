import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type ProcessStatus = 'activo' | 'atencion' | 'pausado';

type RecruitmentProcess = {
  id: number;
  name: string;
  vacancy: string;
  candidates: number;
  pendingActions: number;
  status: ProcessStatus;
  updatedAt: string;
};

type AttentionItem = {
  id: number;
  title: string;
  description: string;
  actionLabel: string;
};

type ActivityItem = {
  id: number;
  description: string;
  time: string;
};

@Component({
  selector: 'app-recruiter-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recruiter-home.html',
})
export class RecruiterHome {
  readonly activeProcesses: RecruitmentProcess[] = [
    {
      id: 1,
      name: 'Proceso Analista de Datos',
      vacancy: 'Analista de Datos',
      candidates: 28,
      pendingActions: 3,
      status: 'atencion',
      updatedAt: 'Actualizado hace 12 min',
    },
    {
      id: 2,
      name: 'Proceso Backend Java',
      vacancy: 'Ingeniero/a Backend Java',
      candidates: 16,
      pendingActions: 0,
      status: 'activo',
      updatedAt: 'Actualizado hace 28 min',
    },
    {
      id: 3,
      name: 'Proceso Operaciones',
      vacancy: 'Supervisor/a de Operaciones',
      candidates: 42,
      pendingActions: 5,
      status: 'atencion',
      updatedAt: 'Actualizado hace 1 h',
    },
  ];

  readonly attentionItems: AttentionItem[] = [
    {
      id: 1,
      title: 'Candidatos esperando revisión',
      description:
        '3 candidatos llevan más tiempo del esperado en revisión.',
      actionLabel: 'Revisar candidatos',
    },
    {
      id: 2,
      title: 'Entrevistas pendientes',
      description:
        '2 entrevistas todavía no tienen una confirmación definitiva.',
      actionLabel: 'Ver entrevistas',
    },
    {
      id: 3,
      title: 'Proceso con baja actividad',
      description:
        'Un proceso no ha registrado actividad reciente.',
      actionLabel: 'Revisar proceso',
    },
  ];

  readonly recentActivity: ActivityItem[] = [
    {
      id: 1,
      description: 'Nuevo candidato incorporado al proceso Analista de Datos.',
      time: 'Hace 8 min',
    },
    {
      id: 2,
      description: 'Agora completó el análisis inicial de 6 candidatos.',
      time: 'Hace 21 min',
    },
    {
      id: 3,
      description: 'Un candidato confirmó disponibilidad para entrevista.',
      time: 'Hace 35 min',
    },
    {
      id: 4,
      description: 'Se actualizó el estado del proceso Backend Java.',
      time: 'Hace 52 min',
    },
  ];

  getProcessStatusLabel(status: ProcessStatus): string {
    switch (status) {
      case 'activo':
        return 'Activo';

      case 'atencion':
        return 'Requiere atención';

      case 'pausado':
        return 'Pausado';
    }
  }
}