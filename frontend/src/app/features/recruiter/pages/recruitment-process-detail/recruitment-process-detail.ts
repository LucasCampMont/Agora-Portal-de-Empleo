
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type ProcessStatus = 'activo' | 'pausado' | 'cerrado';

type PipelineStage = {
  label: string;
  count: number;
};

type ActivityItem = {
  description: string;
  time: string;
  type: 'automation' | 'candidate' | 'recruiter' | 'interview';
};

type ProcessDetail = {
  id: number;
  name: string;
  vacancy: string;
  location: string;
  status: ProcessStatus;
  candidates: number;
  pendingActions: number;
  matchAverage: number;
  activeAutomations: number;
  pipeline: PipelineStage[];
  recentActivity: ActivityItem[];
};

@Component({
  selector: 'app-recruitment-process-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recruitment-process-detail.html',
})
export class RecruitmentProcessDetail {
  private readonly route = inject(ActivatedRoute);

  readonly processId = computed(() =>
    this.route.snapshot.paramMap.get('id'),
  );

  readonly process: ProcessDetail = {
    id: Number(this.processId()),
    name: 'Proceso Analista de Datos',
    vacancy: 'Analista de Datos',
    location: 'Santiago · Híbrido',
    status: 'activo',
    candidates: 28,
    pendingActions: 3,
    matchAverage: 91,
    activeAutomations: 4,

    pipeline: [
      {
        label: 'Nuevos',
        count: 12,
      },
      {
        label: 'Screening',
        count: 8,
      },
      {
        label: 'Evaluación',
        count: 5,
      },
      {
        label: 'Entrevista',
        count: 3,
      },
    ],

    recentActivity: [
      {
        description:
          'Agora completó el screening inicial de 6 candidatos.',
        time: 'Hace 8 min',
        type: 'automation',
      },
      {
        description:
          'Un candidato confirmó disponibilidad para entrevista.',
        time: 'Hace 21 min',
        type: 'candidate',
      },
      {
        description:
          'Se detectaron 3 candidatos pendientes de revisión.',
        time: 'Hace 35 min',
        type: 'recruiter',
      },
      {
        description:
          'Se envió una invitación automática a entrevista.',
        time: 'Hace 52 min',
        type: 'interview',
      },
    ],
  };

  getStatusLabel(status: ProcessStatus): string {
    switch (status) {
      case 'activo':
        return 'Activo';

      case 'pausado':
        return 'Pausado';

      case 'cerrado':
        return 'Cerrado';
    }
  }

  getActivityIcon(type: ActivityItem['type']): string {
    switch (type) {
      case 'automation':
        return 'A';

      case 'candidate':
        return 'C';

      case 'recruiter':
        return 'R';

      case 'interview':
        return 'E';
    }
  }
}
