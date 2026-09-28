import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type RecommendationFilter =
  | 'Todos'
  | 'Alta compatibilidad'
  | 'Nuevos'
  | 'Remoto'
  | 'Híbrido'
  | 'Presencial';

interface RecommendedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  modality: 'Remoto' | 'Híbrido' | 'Presencial';
  salary: string;
  compatibility: number;
  published: string;
  isNew: boolean;
  isSaved: boolean;
  skills: string[];
  missingSkills: string[];
  reasons: string[];
  description: string;
}

@Component({
  selector: 'app-recommended-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommended-jobs.html',
})
export class RecommendedJobs {
  readonly activeFilter = signal<RecommendationFilter>('Todos');

  readonly selectedJob = signal<RecommendedJob | null>(null);

  readonly jobs = signal<RecommendedJob[]>([
    {
      id: 1,
      title: 'Analista BI Junior',
      company: 'Empresa Tecnológica',
      location: 'Santiago, Chile',
      modality: 'Híbrido',
      salary: '$1.200.000 - $1.500.000',
      compatibility: 91,
      published: 'Hace 1 día',
      isNew: true,
      isSaved: false,
      skills: ['SQL', 'Power BI', 'Excel', 'Python'],
      missingSkills: ['Tableau'],
      reasons: [
        'Tu experiencia coincide con el perfil buscado',
        'Tienes experiencia con SQL y Power BI',
        'La modalidad coincide con tus preferencias',
        'El rango salarial está dentro de tu expectativa',
      ],
      description:
        'Buscamos un Analista BI Junior para apoyar la generación de reportes, indicadores y análisis de datos para distintas áreas de la organización.',
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Fintech Chile',
      location: 'Santiago, Chile',
      modality: 'Remoto',
      salary: '$1.300.000 - $1.650.000',
      compatibility: 87,
      published: 'Hace 2 días',
      isNew: true,
      isSaved: true,
      skills: ['SQL', 'Python', 'Power BI'],
      missingSkills: ['Looker'],
      reasons: [
        'Coincide con tus conocimientos de análisis de datos',
        'Tu experiencia con Python es relevante',
        'La modalidad remota coincide con tus preferencias',
      ],
      description:
        'Participarás en el análisis de información, construcción de dashboards y generación de insights para apoyar decisiones de negocio.',
    },
    {
      id: 3,
      title: 'Desarrollador Full Stack Junior',
      company: 'Software Labs',
      location: 'Santiago, Chile',
      modality: 'Híbrido',
      salary: '$1.100.000 - $1.400.000',
      compatibility: 84,
      published: 'Hace 3 días',
      isNew: false,
      isSaved: false,
      skills: ['JavaScript', 'Angular', 'Node.js'],
      missingSkills: ['NestJS'],
      reasons: [
        'Tu experiencia en desarrollo web es relevante',
        'Tu perfil combina desarrollo y análisis',
        'Angular coincide con las tecnologías del cargo',
      ],
      description:
        'Buscamos un desarrollador Full Stack Junior para participar en el desarrollo y mantenimiento de aplicaciones web.',
    },
    {
      id: 4,
      title: 'Ingeniero de Datos Junior',
      company: 'Data Solutions',
      location: 'Santiago, Chile',
      modality: 'Presencial',
      salary: '$1.400.000 - $1.800.000',
      compatibility: 79,
      published: 'Hace 5 días',
      isNew: false,
      isSaved: false,
      skills: ['Python', 'SQL', 'ETL'],
      missingSkills: ['Cloud', 'Spark'],
      reasons: [
        'Tu experiencia con SQL y Python es compatible',
        'Tu experiencia con procesos ETL es relevante',
        'El cargo coincide con tu orientación hacia Data Engineering',
      ],
      description:
        'Buscamos un Ingeniero de Datos Junior para apoyar procesos de integración, transformación y calidad de datos.',
    },
    {
      id: 5,
      title: 'Analista de Datos',
      company: 'Consultora Digital',
      location: 'Santiago, Chile',
      modality: 'Remoto',
      salary: '$1.150.000 - $1.450.000',
      compatibility: 76,
      published: 'Hace 1 semana',
      isNew: false,
      isSaved: false,
      skills: ['Excel', 'SQL', 'Power BI'],
      missingSkills: ['R'],
      reasons: [
        'Tus conocimientos de SQL coinciden con el cargo',
        'Power BI es una de tus habilidades relevantes',
        'El cargo se encuentra dentro de tus áreas de interés',
      ],
      description:
        'Buscamos un Analista de Datos para transformar información en reportes y análisis que apoyen la toma de decisiones.',
    },
  ]);

  readonly filteredJobs = computed(() => {
    const filter = this.activeFilter();

    if (filter === 'Todos') {
      return this.jobs();
    }

    if (filter === 'Alta compatibilidad') {
      return this.jobs().filter((job) => job.compatibility >= 85);
    }

    if (filter === 'Nuevos') {
      return this.jobs().filter((job) => job.isNew);
    }

    return this.jobs().filter((job) => job.modality === filter);
  });

  readonly totalRecommendations = computed(() => this.jobs().length);

  readonly highCompatibilityCount = computed(
    () => this.jobs().filter((job) => job.compatibility >= 85).length,
  );

  readonly newJobsCount = computed(
    () => this.jobs().filter((job) => job.isNew).length,
  );

  setFilter(filter: RecommendationFilter): void {
    this.activeFilter.set(filter);
  }

  selectJob(job: RecommendedJob): void {
    this.selectedJob.set(job);
  }

  closeJobDetail(): void {
    this.selectedJob.set(null);
  }

  toggleSaved(job: RecommendedJob): void {
    this.jobs.update((jobs) =>
      jobs.map((item) =>
        item.id === job.id
          ? {
              ...item,
              isSaved: !item.isSaved,
            }
          : item,
      ),
    );

    if (this.selectedJob()?.id === job.id) {
      this.selectedJob.update((selected) =>
        selected
          ? {
              ...selected,
              isSaved: !selected.isSaved,
            }
          : null,
      );
    }
  }

  applyToJob(job: RecommendedJob): void {
    console.log('Postular a:', job.title);
  }
}