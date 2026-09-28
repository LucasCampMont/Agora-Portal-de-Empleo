import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobSearchBar } from '../../components/job-search-bar/job-search-bar';

interface CandidateCv {
  id: string;
  fileName: string;
  label: string;
  updatedAt: string;
  file?: File;
}

interface ApplicationQuestion {
  id: string;
  prompt: string;
  type: 'short-text' | 'long-text' | 'single-choice';
  required: boolean;
  helpText?: string;
  options?: string[];
}

type ApplicationStep = 0 | 1 | 2 | 3;

type JobMatch = {
  overall: number;
  skills: number;
  experience: number;
  salary: number;
  location: number;
};

type JobCluster =
  | 'Tecnología y Digital'
  | 'Datos e Inteligencia'
  | 'Ingeniería y Ciencias'
  | 'Finanzas y Negocios'
  | 'Comercial y Marketing'
  | 'Administración y Gestión'
  | 'Operaciones e Industria'
  | 'Construcción y Territorio'
  | 'Salud y Ciencias de la Vida'
  | 'Educación y Formación'
  | 'Legal y Gobierno'
  | 'Creatividad y Medios'
  | 'Turismo y Servicios'
  | 'Medio Ambiente y Recursos'
  | 'Transporte y Movilidad'
  | 'Retail y Consumo'
  | 'Deporte y Bienestar'
  | 'Social y Comunidad'
  | 'Investigación y Academia'
  | 'Oficios y Servicios Técnicos'
  | 'Seguridad y Emergencias'
  | 'Otros';

type JobArea =
  | 'Desarrollo de Software'
  | 'Infraestructura y Cloud'
  | 'Ciberseguridad'
  | 'Datos y Analytics'
  | 'Inteligencia Artificial'
  | 'Ingeniería Industrial'
  | 'Ingeniería Civil'
  | 'Finanzas'
  | 'Contabilidad'
  | 'Marketing'
  | 'Ventas'
  | 'Recursos Humanos'
  | 'Operaciones'
  | 'Logística'
  | 'Salud'
  | 'Educación'
  | 'Legal'
  | 'Diseño'
  | 'Comunicación'
  | 'Otro';

type JobModality =
  | 'Presencial'
  | 'Híbrido'
  | 'Remoto';

type JobExperience =
  | 'Práctica'
  | 'Junior'
  | 'Intermedio'
  | 'Senior'
  | 'Dirección';

type JobContractType =
  | 'Jornada completa'
  | 'Media jornada'
  | 'Temporal'
  | 'Práctica'
  | 'Freelance';

type DatePosted =
  | 'any'
  | '24h'
  | '3d'
  | '7d'
  | '30d';

type DistanceFilter =
  | 'any'
  | '5'
  | '10'
  | '25'
  | '50';

type SortOption =
  | 'relevance'
  | 'recent'
  | 'salary-high'
  | 'salary-low'
  | 'match'
  | 'distance';

type QuickFilter =
  | 'date'
  | 'modality'
  | 'experience'
  | 'salary'
  | 'distance'
  | 'contract'
  | null;

type JobTab =
  | 'for-you'
  | 'all'
  | 'saved';

type CandidateJob = {
  id: number;
  title: string;
  company: string;
  location: string;
  distanceKm: number;
  cluster: JobCluster;
  area: JobArea;
  modality: JobModality;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: JobExperience;
  contractType: JobContractType;
  skills: string[];
  description: string;
  publishedAt: string;
  publishedHoursAgo: number;
  saved: boolean;
  match: JobMatch;
};

@Component({
  selector: 'app-candidates-job',
  imports: [JobSearchBar],
  templateUrl: './candidates-job.html',
  styleUrl: './candidates-job.scss',
})
export class CandidatesJob {
  private readonly route = inject(ActivatedRoute);

  readonly searchQuery = signal('');

  readonly showFilters = signal(false);

  readonly openQuickFilter =
    signal<QuickFilter>(null);

  readonly showSelectedJobCompatibility =
    signal(false);

  readonly selectedDatePosted =
    signal<DatePosted>('any');

  readonly selectedModality =
    signal<JobModality | null>(null);

  readonly selectedExperience =
    signal<JobExperience | null>(null);

  readonly selectedContractType =
    signal<JobContractType | null>(null);

  readonly selectedDistance =
    signal<DistanceFilter>('any');

  readonly salaryMin =
    signal<number | null>(null);

  readonly salaryMax =
    signal<number | null>(null);

  readonly sortOption =
    signal<SortOption>('relevance');

  readonly selectedCluster =
    signal<JobCluster | null>(null);

  readonly selectedArea =
    signal<JobArea | null>(null);

  /**
   * Expectativa salarial del candidato.
   * Más adelante esto vendrá desde el perfil del candidato.
   */
  readonly candidateExpectedSalary =
    signal(1300000);

  readonly filterClusters: JobCluster[] = [
    'Tecnología y Digital',
    'Datos e Inteligencia',
    'Ingeniería y Ciencias',
    'Finanzas y Negocios',
    'Comercial y Marketing',
    'Administración y Gestión',
    'Operaciones e Industria',
    'Construcción y Territorio',
    'Salud y Ciencias de la Vida',
    'Educación y Formación',
    'Legal y Gobierno',
    'Creatividad y Medios',
    'Turismo y Servicios',
    'Medio Ambiente y Recursos',
    'Transporte y Movilidad',
    'Retail y Consumo',
    'Deporte y Bienestar',
    'Social y Comunidad',
    'Investigación y Academia',
    'Oficios y Servicios Técnicos',
    'Seguridad y Emergencias',
    'Otros',
  ];

  readonly filterAreas: JobArea[] = [
    'Desarrollo de Software',
    'Infraestructura y Cloud',
    'Ciberseguridad',
    'Datos y Analytics',
    'Inteligencia Artificial',
    'Ingeniería Industrial',
    'Ingeniería Civil',
    'Finanzas',
    'Contabilidad',
    'Marketing',
    'Ventas',
    'Recursos Humanos',
    'Operaciones',
    'Logística',
    'Salud',
    'Educación',
    'Legal',
    'Diseño',
    'Comunicación',
    'Otro',
  ];

  readonly filterExperiences: JobExperience[] = [
    'Práctica',
    'Junior',
    'Intermedio',
    'Senior',
    'Dirección',
  ];

  readonly filterModalities: JobModality[] = [
    'Presencial',
    'Híbrido',
    'Remoto',
  ];

  readonly filterContractTypes: JobContractType[] = [
    'Jornada completa',
    'Media jornada',
    'Temporal',
    'Práctica',
    'Freelance',
  ];

  readonly dateOptions: {
    value: DatePosted;
    label: string;
  }[] = [
    {
      value: 'any',
      label: 'Cualquier fecha',
    },
    {
      value: '24h',
      label: 'Últimas 24 horas',
    },
    {
      value: '3d',
      label: 'Últimos 3 días',
    },
    {
      value: '7d',
      label: 'Última semana',
    },
    {
      value: '30d',
      label: 'Último mes',
    },
  ];

  readonly distanceOptions: {
    value: DistanceFilter;
    label: string;
  }[] = [
    {
      value: 'any',
      label: 'Cualquier distancia',
    },
    {
      value: '5',
      label: 'Hasta 5 km',
    },
    {
      value: '10',
      label: 'Hasta 10 km',
    },
    {
      value: '25',
      label: 'Hasta 25 km',
    },
    {
      value: '50',
      label: 'Hasta 50 km',
    },
  ];

  readonly salaryOptions = [
    {
      value: 500000,
      label: '$500.000',
    },
    {
      value: 800000,
      label: '$800.000',
    },
    {
      value: 1000000,
      label: '$1.000.000',
    },
    {
      value: 1200000,
      label: '$1.200.000',
    },
    {
      value: 1500000,
      label: '$1.500.000',
    },
    {
      value: 2000000,
      label: '$2.000.000',
    },
    {
      value: 3000000,
      label: '$3.000.000',
    },
  ];

  readonly sortOptions: {
    value: SortOption;
    label: string;
  }[] = [
    {
      value: 'relevance',
      label: 'Más relevantes',
    },
    {
      value: 'recent',
      label: 'Más recientes',
    },
    {
      value: 'salary-high',
      label: 'Mayor sueldo',
    },
    {
      value: 'salary-low',
      label: 'Menor sueldo',
    },
    {
      value: 'match',
      label: 'Mayor compatibilidad',
    },
    {
      value: 'distance',
      label: 'Menor distancia',
    },
  ];

  readonly jobs = signal<CandidateJob[]>([
    {
      id: 1,
      title: 'Analista de Datos',
      company: 'Empresa XYZ',
      location: 'Santiago',
      distanceKm: 5,
      cluster: 'Datos e Inteligencia',
      area: 'Datos y Analytics',
      modality: 'Híbrido',
      salaryMin: 1200000,
      salaryMax: 1500000,
      experienceLevel: 'Intermedio',
      contractType: 'Jornada completa',
      skills: [
        'Python',
        'SQL',
        'Power BI',
      ],
      description:
        'Buscamos un Analista de Datos para analizar información, construir reportes y generar indicadores que apoyen la toma de decisiones.',
      publishedAt: 'Hace 2 horas',
      publishedHoursAgo: 2,
      saved: true,
      match: {
        overall: 92,
        skills: 95,
        experience: 88,
        salary: 90,
        location: 96,
      },
    },

    {
      id: 2,
      title: 'Desarrollador Backend Junior',
      company: 'Tech Solutions',
      location: 'Santiago',
      distanceKm: 8,
      cluster: 'Tecnología y Digital',
      area: 'Desarrollo de Software',
      modality: 'Remoto',
      salaryMin: 1000000,
      salaryMax: 1300000,
      experienceLevel: 'Junior',
      contractType: 'Jornada completa',
      skills: [
        'NestJS',
        'TypeScript',
      ],
      description:
        'Participarás en el desarrollo y mantenimiento de servicios backend para aplicaciones web.',
      publishedAt: 'Hace 5 horas',
      publishedHoursAgo: 5,
      saved: false,
      match: {
        overall: 78,
        skills: 82,
        experience: 85,
        salary: 76,
        location: 88,
      },
    },

    {
      id: 3,
      title: 'Analista BI',
      company: 'Data Corp',
      location: 'Santiago',
      distanceKm: 11,
      cluster: 'Datos e Inteligencia',
      area: 'Datos y Analytics',
      modality: 'Presencial',
      salaryMin: 1100000,
      salaryMax: 1400000,
      experienceLevel: 'Intermedio',
      contractType: 'Jornada completa',
      skills: [
        'Power BI',
        'SQL',
      ],
      description:
        'Responsable de construir indicadores, reportes y visualizaciones para distintas áreas del negocio.',
      publishedAt: 'Hace 1 día',
      publishedHoursAgo: 24,
      saved: false,
      match: {
        overall: 86,
        skills: 91,
        experience: 84,
        salary: 87,
        location: 78,
      },
    },

    {
      id: 4,
      title: 'Ingeniero de Datos Junior',
      company: 'DataLab',
      location: 'Santiago',
      distanceKm: 14,
      cluster: 'Datos e Inteligencia',
      area: 'Datos y Analytics',
      modality: 'Híbrido',
      salaryMin: 1300000,
      salaryMax: 1600000,
      experienceLevel: 'Junior',
      contractType: 'Jornada completa',
      skills: [
        'Python',
        'SQL',
        'GCP',
      ],
      description:
        'Apoyarás procesos de integración, transformación y procesamiento de datos utilizando tecnologías cloud.',
      publishedAt: 'Hace 2 días',
      publishedHoursAgo: 48,
      saved: false,
      match: {
        overall: 81,
        skills: 89,
        experience: 82,
        salary: 79,
        location: 84,
      },
    },

    {
      id: 5,
      title: 'Analista de Operaciones',
      company: 'Servicios Empresariales',
      location: 'Las Condes',
      distanceKm: 9,
      cluster: 'Operaciones e Industria',
      area: 'Operaciones',
      modality: 'Híbrido',
      salaryMin: 1000000,
      salaryMax: 1300000,
      experienceLevel: 'Intermedio',
      contractType: 'Jornada completa',
      skills: [
        'Excel',
        'Power BI',
        'SQL',
      ],
      description:
        'Analizar información operacional, generar indicadores y apoyar la mejora de procesos internos.',
      publishedAt: 'Hace 3 días',
      publishedHoursAgo: 72,
      saved: false,
      match: {
        overall: 74,
        skills: 80,
        experience: 86,
        salary: 82,
        location: 90,
      },
    },
  ]);

  readonly activeTab =
    signal<JobTab>('for-you');

  readonly selectedJobId =
    signal(1);

  readonly selectedJob = computed(() => {
    const visible = this.visibleJobs();

    return (
      visible.find(
        (job) => job.id === this.selectedJobId(),
      ) ??
      visible[0] ??
      null
    );
  });

  readonly visibleJobs = computed(() => {
    const query =
      this.normalizeText(
        this.searchQuery(),
      );

    let jobs = [...this.jobs()];

    switch (this.activeTab()) {
      case 'saved':
        jobs = jobs.filter(
          (job) => job.saved,
        );
        break;

      case 'for-you':
        jobs = jobs.filter(
          (job) => job.match.overall >= 75,
        );
        break;

      case 'all':
      default:
        break;
    }

    jobs = jobs.filter((job) => {
      if (
        this.selectedCluster() &&
        job.cluster !== this.selectedCluster()
      ) {
        return false;
      }

      if (
        this.selectedArea() &&
        job.area !== this.selectedArea()
      ) {
        return false;
      }

      if (
        this.selectedModality() &&
        job.modality !== this.selectedModality()
      ) {
        return false;
      }

      if (
        this.selectedExperience() &&
        job.experienceLevel !==
          this.selectedExperience()
      ) {
        return false;
      }

      if (
        this.selectedContractType() &&
        job.contractType !==
          this.selectedContractType()
      ) {
        return false;
      }

      const dateFilter =
        this.selectedDatePosted();

      if (
        dateFilter !== 'any' &&
        job.publishedHoursAgo >
          this.getDateLimitHours(
            dateFilter,
          )
      ) {
        return false;
      }

      const distanceFilter =
        this.selectedDistance();

      if (
        distanceFilter !== 'any' &&
        job.distanceKm >
          Number(distanceFilter)
      ) {
        return false;
      }

      const minSalary =
        this.salaryMin();

      if (
        minSalary !== null &&
        job.salaryMax < minSalary
      ) {
        return false;
      }

      const maxSalary =
        this.salaryMax();

      if (
        maxSalary !== null &&
        job.salaryMin > maxSalary
      ) {
        return false;
      }

      if (query) {
        const searchTerms =
          query
            .split(/\s+/)
            .filter(Boolean);

        const searchableText =
          this.normalizeText(
            [
              job.title,
              job.company,
              job.location,
              job.cluster,
              job.area,
              job.modality,
              job.experienceLevel,
              job.contractType,
              ...job.skills,
              job.description,
            ].join(' '),
          );

        const matchesSearch =
          searchTerms.every(
            (term) =>
              searchableText.includes(term),
          );

        if (!matchesSearch) {
          return false;
        }
      }

      return true;
    });

    switch (this.sortOption()) {
      case 'recent':
        jobs.sort(
          (a, b) =>
            a.publishedHoursAgo -
            b.publishedHoursAgo,
        );
        break;

      case 'salary-high':
        jobs.sort(
          (a, b) =>
            b.salaryMax -
            a.salaryMax,
        );
        break;

      case 'salary-low':
        jobs.sort(
          (a, b) =>
            a.salaryMin -
            b.salaryMin,
        );
        break;

      case 'match':
        jobs.sort(
          (a, b) =>
            b.match.overall -
            a.match.overall,
        );
        break;

      case 'distance':
        jobs.sort(
          (a, b) =>
            a.distanceKm -
            b.distanceKm,
        );
        break;

      case 'relevance':
      default:
        jobs.sort(
          (a, b) =>
            b.match.overall -
            a.match.overall,
        );
        break;
    }

    return jobs;
  });

  readonly activeFilterCount =
    computed(() => {
      let count = 0;

      if (
        this.selectedDatePosted() !==
        'any'
      ) {
        count++;
      }

      if (this.selectedModality()) {
        count++;
      }

      if (this.selectedExperience()) {
        count++;
      }

      if (
        this.selectedContractType()
      ) {
        count++;
      }

      if (
        this.selectedDistance() !==
        'any'
      ) {
        count++;
      }

      if (this.salaryMin() !== null) {
        count++;
      }

      if (this.salaryMax() !== null) {
        count++;
      }

      if (this.selectedCluster()) {
        count++;
      }

      if (this.selectedArea()) {
        count++;
      }

      return count;
    });

  readonly advancedFilterCount =
    computed(() => {
      let count = 0;

      if (this.selectedCluster()) {
        count++;
      }

      if (this.selectedArea()) {
        count++;
      }

      return count;
    });

  handleSearch(query: string): void {
    this.searchQuery.set(query);
  }

  setJobTab(tab: JobTab): void {
    this.activeTab.set(tab);
  }

  selectJob(jobId: number): void {
    this.selectedJobId.set(jobId);
  }

  toggleSavedJob(jobId: number): void {
    this.jobs.update((jobs) =>
      jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              saved: !job.saved,
            }
          : job,
      ),
    );
  }

  toggleSelectedJobCompatibility(): void {
  this.showSelectedJobCompatibility.update(
    (value) => !value,
  );
}

  getCompatibility(
    job: CandidateJob,
  ): number {
    return job.match.overall;
  }

  getSalaryCompatibility(
    job: CandidateJob,
  ): number {
    const expected =
      this.candidateExpectedSalary();

    /**
     * Si la expectativa está dentro del rango,
     * la coincidencia es máxima.
     */
    if (
      expected >= job.salaryMin &&
      expected <= job.salaryMax
    ) {
      return 100;
    }

    /**
     * Si la expectativa está por debajo
     * del mínimo ofrecido, calculamos qué tan
     * cerca está.
     */
    if (expected < job.salaryMin) {
      const difference =
        job.salaryMin - expected;

      const tolerance =
        Math.max(
          expected * 0.25,
          100000,
        );

      return Math.max(
        0,
        Math.round(
          100 -
            (difference /
              tolerance) *
              100,
        ),
      );
    }

    /**
     * Si la expectativa está por encima
     * del máximo ofrecido, ocurre lo mismo.
     */
    const difference =
      expected - job.salaryMax;

    const tolerance =
      Math.max(
        expected * 0.25,
        100000,
      );

    return Math.max(
      0,
      Math.round(
        100 -
          (difference /
            tolerance) *
            100,
      ),
    );
  }

  getSalaryCompatibilityLabel(
    job: CandidateJob,
  ): string {
    const expected =
      this.candidateExpectedSalary();

    if (
      expected >= job.salaryMin &&
      expected <= job.salaryMax
    ) {
      return 'Tu expectativa está dentro del rango';
    }

    if (
      expected < job.salaryMin
    ) {
      return 'La oferta supera tu expectativa';
    }

    return 'Tu expectativa supera el rango ofrecido';
  }

  getCompatibilityLabel(
    value: number,
  ): string {
    if (value >= 90) {
      return 'Muy alta';
    }

    if (value >= 80) {
      return 'Alta';
    }

    if (value >= 70) {
      return 'Buena';
    }

    if (value >= 60) {
      return 'Media';
    }

    return 'Baja';
  }

  formatSalary(
    value: number,
  ): string {
    return `$${value.toLocaleString(
      'es-CL',
    )}`;
  }

  toggleQuickFilter(
    filter: Exclude<
      QuickFilter,
      null
    >,
  ): void {
    this.openQuickFilter.update(
      (current) =>
        current === filter
          ? null
          : filter,
    );
  }

  closeQuickFilter(): void {
    this.openQuickFilter.set(null);
  }

  selectDatePosted(
    value: DatePosted,
  ): void {
    this.selectedDatePosted.set(
      value,
    );

    this.closeQuickFilter();
  }

  selectModality(
    modality:
      | JobModality
      | null,
  ): void {
    this.selectedModality.set(
      modality,
    );

    this.closeQuickFilter();
  }

  selectExperience(
    experience:
      | JobExperience
      | null,
  ): void {
    this.selectedExperience.set(
      experience,
    );

    this.closeQuickFilter();
  }

  selectContractType(
    contractType:
      | JobContractType
      | null,
  ): void {
    this.selectedContractType.set(
      contractType,
    );

    this.closeQuickFilter();
  }

  selectDistance(
    distance: DistanceFilter,
  ): void {
    this.selectedDistance.set(
      distance,
    );

    this.closeQuickFilter();
  }

  selectSalaryMin(
    salary: number | null,
  ): void {
    this.salaryMin.set(salary);
  }

  selectSalaryMax(
    salary: number | null,
  ): void {
    this.salaryMax.set(salary);
  }

  applySalaryFilter(): void {
    this.closeQuickFilter();
  }

  toggleFilters(): void {
    this.showFilters.update(
      (isOpen) => !isOpen,
    );

    this.closeQuickFilter();
  }

  toggleCluster(
    cluster: JobCluster,
  ): void {
    this.selectedCluster.update(
      (current) =>
        current === cluster
          ? null
          : cluster,
    );
  }

  toggleArea(
    area: JobArea,
  ): void {
    this.selectedArea.update(
      (current) =>
        current === area
          ? null
          : area,
    );
  }

  clearFilters(): void {
    this.selectedDatePosted.set(
      'any',
    );

    this.selectedModality.set(null);

    this.selectedExperience.set(
      null,
    );

    this.selectedContractType.set(
      null,
    );

    this.selectedDistance.set(
      'any',
    );

    this.salaryMin.set(null);

    this.salaryMax.set(null);

    this.selectedCluster.set(
      null,
    );

    this.selectedArea.set(null);

    this.searchQuery.set('');

    this.closeQuickFilter();
  }

  setSortOption(
    option: SortOption,
  ): void {
    this.sortOption.set(option);
  }

  readonly isApplicationOpen =
    signal(false);

  readonly applicationSent =
    signal(false);

  readonly applicationStep =
    signal<ApplicationStep>(0);

  readonly applicationSteps = [
    {
      number: 1,
      label: 'Oferta',
    },
    {
      number: 2,
      label: 'Perfil y condiciones',
    },
    {
      number: 3,
      label: 'Preguntas',
    },
    {
      number: 4,
      label: 'Revisión',
    },
  ];

  readonly expectedSalary =
    signal('');

  readonly applicationQuestions:
    ApplicationQuestion[] = [
      {
        id: 'data-experience',
        prompt:
          '¿Qué experiencia tienes preparando reportes para apoyar decisiones de negocio?',
        type: 'long-text',
        required: true,
        helpText:
          'Describe brevemente un ejemplo concreto.',
      },
      {
        id: 'power-bi-level',
        prompt:
          '¿Cuál es tu nivel de experiencia usando Power BI?',
        type: 'single-choice',
        required: true,
        options: [
          'Básico',
          'Intermedio',
          'Avanzado',
        ],
      },
    ];

  readonly applicationAnswers =
    signal<Record<string, string>>(
      {},
    );

  readonly candidateProfile = {
    fullName:
      'Lucas Campos Montes',
    email:
      'lucas.campos@example.com',
    phone:
      '+56 9 1234 5678',
    professionalTitle:
      'Analista de Datos',
    location:
      'Santiago, Chile',
  };

  readonly cvs =
    signal<CandidateCv[]>([
      {
        id: 'cv-1',
        fileName:
          'lucas-campos-cv.pdf',
        label: 'CV Full Stack',
        updatedAt:
          'Actualizado el 12 de septiembre',
      },
      {
        id: 'cv-2',
        fileName:
          'lucas-campos-data.pdf',
        label: 'CV Data',
        updatedAt:
          'Actualizado el 3 de agosto',
      },
    ]);

  readonly selectedCvId =
    signal<string | null>(
      'cv-1',
    );

  readonly selectedCv =
    computed(
      () =>
        this.cvs().find(
          (cv) =>
            cv.id ===
            this.selectedCvId(),
        ) ?? null,
    );

  readonly vacancySkills = [
    {
      name: 'SQL',
      matches: true,
    },
    {
      name: 'Python',
      matches: true,
    },
    {
      name: 'Power BI',
      matches: false,
    },
  ];

  constructor() {
    this.route.queryParamMap.subscribe(
      (params) => {
        const tab = params.get('tab');

        if (
          tab === 'saved' ||
          tab === 'all' ||
          tab === 'for-you'
        ) {
          this.activeTab.set(tab);
          return;
        }

        this.activeTab.set('for-you');
      },
    );
  }

  startApplication(): void {
    this.applicationStep.set(0);
    this.applicationSent.set(
      false,
    );
    this.isApplicationOpen.set(
      true,
    );
  }

  returnToOffer(): void {
    this.isApplicationOpen.set(
      false,
    );
  }

  goToApplicationStep(
    step: number,
  ): void {
    if (
      step >= 0 &&
      step <= 3
    ) {
      this.applicationStep.set(
        step as ApplicationStep,
      );
    }
  }

  nextApplicationStep(): void {
    const currentStep =
      this.applicationStep();

    if (
      currentStep === 1 &&
      !this.selectedCvId()
    ) {
      return;
    }

    if (
      currentStep === 2 &&
      !this.hasAnsweredRequiredQuestions()
    ) {
      return;
    }

    if (currentStep < 3) {
      this.applicationStep.set(
        (currentStep + 1) as ApplicationStep,
      );
    }
  }

  previousApplicationStep(): void {
    const currentStep =
      this.applicationStep();

    if (currentStep === 0) {
      this.returnToOffer();
      return;
    }

    this.applicationStep.set(
      (currentStep - 1) as ApplicationStep,
    );
  }

  selectCv(
    cvId: string,
  ): void {
    this.selectedCvId.set(
      cvId,
    );
  }

  addCv(event: Event): void {
    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) {
      return;
    }

    const newCv: CandidateCv = {
      id: crypto.randomUUID(),
      fileName: file.name,
      label: file.name.replace(
        /\.pdf$/i,
        '',
      ),
      updatedAt:
        'Agregado para esta postulación',
      file,
    };

    this.cvs.update(
      (currentCvs) => [
        ...currentCvs,
        newCv,
      ],
    );

    this.selectedCvId.set(
      newCv.id,
    );

    input.value = '';
  }

  updateExpectedSalary(
    event: Event,
  ): void {
    const input =
      event.target as HTMLInputElement;

    this.expectedSalary.set(
      input.value,
    );
  }

  updateApplicationAnswer(
    questionId: string,
    event: Event,
  ): void {
    const input =
      event.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;

    this.applicationAnswers.update(
      (answers) => ({
        ...answers,
        [questionId]:
          input.value,
      }),
    );
  }

  private hasAnsweredRequiredQuestions(): boolean {
    return this.applicationQuestions
      .filter(
        (question) =>
          question.required,
      )
      .every(
        (question) =>
          this.applicationAnswers()[
            question.id
          ]?.trim(),
      );
  }

  submitApplication(): void {
    if (
      !this.selectedCvId() ||
      !this.hasAnsweredRequiredQuestions()
    ) {
      return;
    }

    this.applicationSent.set(
      true,
    );
  }

  private normalizeText(
    value: string,
  ): string {
    return value
      .normalize('NFD')
      .replace(
        /\p{Diacritic}/gu,
        '',
      )
      .toLowerCase();
  }

  private getDateLimitHours(
    value: DatePosted,
  ): number {
    switch (value) {
      case '24h':
        return 24;

      case '3d':
        return 72;

      case '7d':
        return 168;

      case '30d':
        return 720;

      case 'any':
      default:
        return Infinity;
    }
  }
}