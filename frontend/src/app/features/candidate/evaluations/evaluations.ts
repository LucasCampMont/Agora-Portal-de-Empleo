import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type EvaluationType =
  | 'Psicolaboral'
  | 'Técnica'
  | 'Competencias'
  | 'Personalidad'
  | 'Idioma';

type EvaluationStatus =
  | 'Pendiente'
  | 'En progreso'
  | 'Completada'
  | 'Vencida';

type EvaluationSource = 'Ágora' | 'Externa';

interface Evaluation {
  id: number;
  title: string;
  type: EvaluationType;
  status: EvaluationStatus;
  source: EvaluationSource;
  company: string;
  process: string;
  requestedDate: string;
  deadline?: string;
  duration: string;
  description: string;
  score?: number;
  resultAvailable: boolean;
}

type EvaluationFilter =
  | 'Todas'
  | 'Pendientes'
  | 'En progreso'
  | 'Completadas';

@Component({
  selector: 'app-evaluations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluations.html',
})
export class Evaluations {
  readonly activeFilter = signal<EvaluationFilter>('Todas');

  readonly selectedEvaluation = signal<Evaluation | null>(null);

  readonly evaluations = signal<Evaluation[]>([
    {
      id: 1,
      title: 'Evaluación psicolaboral',
      type: 'Psicolaboral',
      status: 'Pendiente',
      source: 'Externa',
      company: 'Empresa Tecnológica',
      process: 'Analista BI Junior',
      requestedDate: '25 sep 2026',
      deadline: '30 sep 2026',
      duration: '30 - 40 min',
      description:
        'Evaluación solicitada como parte del proceso de selección para conocer diferentes aspectos del perfil laboral y comportamiento profesional.',
      resultAvailable: false,
    },
    {
      id: 2,
      title: 'Evaluación técnica de SQL',
      type: 'Técnica',
      status: 'Pendiente',
      source: 'Ágora',
      company: 'Fintech Chile',
      process: 'Data Analyst',
      requestedDate: '24 sep 2026',
      deadline: '29 sep 2026',
      duration: '45 min',
      description:
        'Evaluación técnica orientada a SQL, análisis de datos y resolución de problemas relacionados con el cargo.',
      resultAvailable: false,
    },
    {
      id: 3,
      title: 'Evaluación de competencias',
      type: 'Competencias',
      status: 'En progreso',
      source: 'Externa',
      company: 'Software Labs',
      process: 'Desarrollador Full Stack Junior',
      requestedDate: '23 sep 2026',
      deadline: '28 sep 2026',
      duration: '25 min',
      description:
        'Evaluación enfocada en competencias relacionadas con comunicación, resolución de problemas y trabajo en equipo.',
      resultAvailable: false,
    },
    {
      id: 4,
      title: 'Perfil DISC',
      type: 'Personalidad',
      status: 'Completada',
      source: 'Ágora',
      company: 'Perfil Ágora',
      process: 'Evaluación de perfil',
      requestedDate: '15 sep 2026',
      duration: '15 min',
      description:
        'Evaluación de personalidad orientada a identificar tendencias de comportamiento y estilo profesional.',
      score: 86,
      resultAvailable: true,
    },
    {
      id: 5,
      title: 'Evaluación técnica Python',
      type: 'Técnica',
      status: 'Completada',
      source: 'Ágora',
      company: 'Data Solutions',
      process: 'Ingeniero de Datos Junior',
      requestedDate: '10 sep 2026',
      duration: '40 min',
      description:
        'Evaluación técnica sobre Python, procesamiento de datos y resolución de problemas.',
      score: 82,
      resultAvailable: true,
    },
    {
      id: 6,
      title: 'Inglés profesional',
      type: 'Idioma',
      status: 'Vencida',
      source: 'Externa',
      company: 'Consultora Digital',
      process: 'Analista de Datos',
      requestedDate: '02 sep 2026',
      deadline: '08 sep 2026',
      duration: '30 min',
      description:
        'Evaluación de comprensión y comunicación en inglés orientada al contexto profesional.',
      resultAvailable: false,
    },
  ]);

  readonly filteredEvaluations = computed(() => {
    const filter = this.activeFilter();

    if (filter === 'Todas') {
      return this.evaluations();
    }

    if (filter === 'Pendientes') {
      return this.evaluations().filter(
        (evaluation) => evaluation.status === 'Pendiente',
      );
    }

    if (filter === 'En progreso') {
      return this.evaluations().filter(
        (evaluation) => evaluation.status === 'En progreso',
      );
    }

    return this.evaluations().filter(
      (evaluation) => evaluation.status === 'Completada',
    );
  });

  readonly pendingCount = computed(
    () =>
      this.evaluations().filter(
        (evaluation) => evaluation.status === 'Pendiente',
      ).length,
  );

  readonly inProgressCount = computed(
    () =>
      this.evaluations().filter(
        (evaluation) => evaluation.status === 'En progreso',
      ).length,
  );

  readonly completedCount = computed(
    () =>
      this.evaluations().filter(
        (evaluation) => evaluation.status === 'Completada',
      ).length,
  );

  readonly externalCount = computed(
    () =>
      this.evaluations().filter(
        (evaluation) => evaluation.source === 'Externa',
      ).length,
  );

  setFilter(filter: EvaluationFilter): void {
    this.activeFilter.set(filter);
  }

  selectEvaluation(evaluation: Evaluation): void {
    this.selectedEvaluation.set(evaluation);
  }

  closeEvaluation(): void {
    this.selectedEvaluation.set(null);
  }

  startEvaluation(evaluation: Evaluation): void {
    console.log('Iniciar evaluación:', evaluation.title);

    if (evaluation.source === 'Externa') {
      console.log('Redirigir a plataforma externa');
      return;
    }

    this.evaluations.update((evaluations) =>
      evaluations.map((item) =>
        item.id === evaluation.id
          ? {
              ...item,
              status: 'En progreso',
            }
          : item,
      ),
    );

    this.selectedEvaluation.update((selected) =>
      selected?.id === evaluation.id
        ? {
            ...selected,
            status: 'En progreso',
          }
        : selected,
    );
  }

  continueEvaluation(evaluation: Evaluation): void {
    console.log('Continuar evaluación:', evaluation.title);
  }

  viewResult(evaluation: Evaluation): void {
    console.log('Ver resultado:', evaluation.title);
  }

  getStatusClass(status: EvaluationStatus): string {
    switch (status) {
      case 'Pendiente':
        return 'bg-amber-50 text-amber-700 border-amber-200';

      case 'En progreso':
        return 'bg-blue-50 text-blue-700 border-blue-200';

      case 'Completada':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';

      case 'Vencida':
        return 'bg-red-50 text-red-700 border-red-200';

      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  }

  getTypeIcon(type: EvaluationType): string {
    switch (type) {
      case 'Psicolaboral':
        return '🧠';

      case 'Técnica':
        return '💻';

      case 'Competencias':
        return '🧩';

      case 'Personalidad':
        return '◉';

      case 'Idioma':
        return '🌐';

      default:
        return '◌';
    }
  }
}