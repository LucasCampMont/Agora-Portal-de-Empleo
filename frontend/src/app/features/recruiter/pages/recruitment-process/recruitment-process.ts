import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type ProcessStatus = 'activo' | 'pausado' | 'cerrado';

type PipelineSummary = {
  newCandidates: number;
  screening: number;
  evaluation: number;
  interview: number;
};

type Process = {
  id: number;
  name: string;
  vacancy: string;
  location: string;
  status: ProcessStatus;
  candidates: number;
  pendingActions: number;
  updatedAt: string;
  pipeline: PipelineSummary;
};

type ActivityItem = {
  id: number;
  description: string;
  process: string;
  time: string;
};

@Component({
  selector: 'app-recruitment-process',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recruitment-process.html',
})
export class RecruitmentProcess {
  readonly processes: Process[] = [
    {
      id: 1,
      name: 'Proceso Analista de Datos',
      vacancy: 'Analista de Datos',
      location: 'Santiago · Híbrido',
      status: 'activo',
      candidates: 28,
      pendingActions: 3,
      updatedAt: 'Hace 12 min',
      pipeline: {
        newCandidates: 12,
        screening: 8,
        evaluation: 5,
        interview: 3,
      },
    },
    {
      id: 2,
      name: 'Proceso Backend Java',
      vacancy: 'Ingeniero/a Backend Java',
      location: 'Santiago · Híbrido',
      status: 'activo',
      candidates: 16,
      pendingActions: 0,
      updatedAt: 'Hace 28 min',
      pipeline: {
        newCandidates: 6,
        screening: 5,
        evaluation: 3,
        interview: 2,
      },
    },
    {
      id: 3,
      name: 'Proceso Operaciones',
      vacancy: 'Supervisor/a de Operaciones',
      location: 'Santiago · Presencial',
      status: 'activo',
      candidates: 42,
      pendingActions: 5,
      updatedAt: 'Hace 1 h',
      pipeline: {
        newCandidates: 18,
        screening: 12,
        evaluation: 7,
        interview: 5,
      },
    },
    {
      id: 4,
      name: 'Proceso Asistente Administrativo',
      vacancy: 'Asistente administrativo/a',
      location: 'Chile · Remoto',
      status: 'pausado',
      candidates: 9,
      pendingActions: 1,
      updatedAt: 'Hace 2 días',
      pipeline: {
        newCandidates: 4,
        screening: 3,
        evaluation: 1,
        interview: 1,
      },
    },
  ];

  readonly recentActivity: ActivityItem[] = [
    {
      id: 1,
      description: 'Agora completó el screening inicial de 6 candidatos.',
      process: 'Analista de Datos',
      time: 'Hace 8 min',
    },
    {
      id: 2,
      description: 'Un candidato confirmó disponibilidad para entrevista.',
      process: 'Backend Java',
      time: 'Hace 21 min',
    },
    {
      id: 3,
      description: 'Se detectaron candidatos pendientes de revisión.',
      process: 'Operaciones',
      time: 'Hace 35 min',
    },
    {
      id: 4,
      description: 'El proceso fue pausado por el recruiter.',
      process: 'Asistente Administrativo',
      time: 'Hace 2 días',
    },
  ];

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
}