import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type ApplicationStatus =
  | 'Enviada'
  | 'En revisión'
  | 'Evaluación'
  | 'Entrevista'
  | 'Oferta'
  | 'Finalizada';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

interface PendingInformation {
  title: string;
  description: string;
  fields: string[];
}

interface Evaluation {
  title: string;
  status: string;
  deadline?: string;
}

interface Interview {
  date: string;
  time: string;
  type: string;
  platform?: string;
  meetingUrl?: string;
}

interface Communication {
  email?: boolean;
  whatsapp?: boolean;
}

interface Application {
  id: number;

  jobTitle: string;
  company: string;

  location: string;
  modality: string;
  salary: string;

  appliedDate: string;
  status: ApplicationStatus;

  compatibility: number;

  cvId: string;
  cvName: string;
  expectedSalary: number;

  viewed: boolean;
  viewedDate?: string;

  applicantsInProcess?: number;

  pendingInformation?: PendingInformation;

  evaluation?: Evaluation;

  interview?: Interview;

  feedback?: string;

  communication?: Communication;

  timeline: TimelineEvent[];
}

interface CvPreview {
  id: string;
  name: string;
  fileName: string;
  language: string;
}

@Component({
  selector: 'app-candidates-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidates-applications.html',
})
export class CandidatesApplications {

  // =========================================================
  // FILTROS Y BÚSQUEDA
  // =========================================================

  searchQuery = signal('');

  selectedFilter = signal<
    'Todas' | ApplicationStatus
  >('Todas');


  // =========================================================
  // POSTULACIONES
  // =========================================================

  applications = signal<Application[]>([
    {
      id: 1,

      jobTitle: 'Analista de Datos',
      company: 'Empresa XYZ',

      location: 'Santiago',
      modality: 'Híbrido',
      salary: '$1.200.000 – $1.500.000',

      appliedDate: '25 sep 2026',
      status: 'En revisión',

      compatibility: 92,

      cvId: 'cv-data',
      cvName: 'CV Data',
      expectedSalary: 1300000,

      viewed: true,
      viewedDate: '26 sep 2026 · 14:32',

      applicantsInProcess: 12,

      pendingInformation: {
        title: 'Información adicional solicitada',
        description:
          'La empresa necesita algunos datos adicionales para continuar evaluando tu postulación.',
        fields: [
          'Disponibilidad',
          'Experiencia con Power BI',
        ],
      },

      evaluation: {
        title: 'Evaluación técnica',
        status: 'Pendiente',
        deadline: '30 sep 2026',
      },

      communication: {
        email: true,
        whatsapp: false,
      },

      timeline: [
        {
          date: '25 sep',
          title: 'Postulación enviada',
          description:
            'Tu postulación fue enviada correctamente.',
          completed: true,
        },
        {
          date: '26 sep',
          title: 'CV revisado',
          description:
            'La empresa revisó el CV utilizado en tu postulación.',
          completed: true,
        },
        {
          date: '27 sep',
          title: 'En revisión',
          description:
            'La empresa está evaluando tu perfil.',
          completed: true,
          current: true,
        },
        {
          date: '',
          title: 'Evaluación',
          description:
            'Podrían solicitarte una evaluación durante el proceso.',
          completed: false,
        },
        {
          date: '',
          title: 'Entrevista',
          description:
            'Etapa posterior del proceso de selección.',
          completed: false,
        },
        {
          date: '',
          title: 'Oferta',
          description:
            'Oferta laboral, si la empresa decide avanzar.',
          completed: false,
        },
      ],
    },

    // =======================================================
    // POSTULACIÓN 2
    // =======================================================

    {
      id: 2,

      jobTitle: 'Backend Developer Junior',
      company: 'Tech Solutions',

      location: 'Remoto',
      modality: 'Remoto',
      salary: '$1.000.000 – $1.300.000',

      appliedDate: '23 sep 2026',
      status: 'Evaluación',

      compatibility: 78,

      cvId: 'cv-fullstack',
      cvName: 'CV Full Stack',
      expectedSalary: 1200000,

      viewed: true,
      viewedDate: '24 sep 2026 · 09:18',

      applicantsInProcess: 8,

      evaluation: {
        title: 'Evaluación técnica',
        status: 'Pendiente',
        deadline: '29 sep 2026',
      },

      communication: {
        email: true,
        whatsapp: true,
      },

      timeline: [
        {
          date: '23 sep',
          title: 'Postulación enviada',
          description:
            'Tu postulación fue enviada correctamente.',
          completed: true,
        },
        {
          date: '24 sep',
          title: 'CV revisado',
          description:
            'La empresa revisó tu CV.',
          completed: true,
        },
        {
          date: '25 sep',
          title: 'En revisión',
          description:
            'Tu perfil pasó a revisión.',
          completed: true,
        },
        {
          date: '26 sep',
          title: 'Evaluación',
          description:
            'Tienes una evaluación pendiente.',
          completed: true,
          current: true,
        },
        {
          date: '',
          title: 'Entrevista',
          description:
            'La entrevista podría ser la siguiente etapa.',
          completed: false,
        },
        {
          date: '',
          title: 'Oferta',
          description:
            'Oferta laboral, si la empresa decide avanzar.',
          completed: false,
        },
      ],
    },

    // =======================================================
    // POSTULACIÓN 3
    // =======================================================

    {
      id: 3,

      jobTitle: 'Analista BI',
      company: 'DataCorp',

      location: 'Las Condes',
      modality: 'Híbrido',
      salary: '$1.100.000 – $1.400.000',

      appliedDate: '20 sep 2026',
      status: 'Entrevista',

      compatibility: 86,

      cvId: 'cv-data',
      cvName: 'CV Data',
      expectedSalary: 1300000,

      viewed: true,
      viewedDate: '21 sep 2026 · 11:42',

      applicantsInProcess: 5,

      interview: {
        date: '29 sep 2026',
        time: '11:00',
        type: 'Entrevista online',
        platform: 'Google Meet',
        meetingUrl: 'https://meet.google.com/',
      },

      communication: {
        email: true,
        whatsapp: true,
      },

      timeline: [
        {
          date: '20 sep',
          title: 'Postulación enviada',
          description:
            'Tu postulación fue enviada correctamente.',
          completed: true,
        },
        {
          date: '21 sep',
          title: 'CV revisado',
          description:
            'La empresa revisó tu CV.',
          completed: true,
        },
        {
          date: '22 sep',
          title: 'En revisión',
          description:
            'Tu perfil fue considerado para avanzar.',
          completed: true,
        },
        {
          date: '25 sep',
          title: 'Evaluación',
          description:
            'La evaluación del proceso fue completada.',
          completed: true,
        },
        {
          date: '26 sep',
          title: 'Entrevista',
          description:
            'Tienes una entrevista programada.',
          completed: true,
          current: true,
        },
        {
          date: '',
          title: 'Oferta',
          description:
            'Oferta laboral, si la empresa decide avanzar.',
          completed: false,
        },
      ],
    },

    // =======================================================
    // POSTULACIÓN 4
    // =======================================================

    {
      id: 4,

      jobTitle: 'Analista de Operaciones',
      company: 'Logística Nacional',

      location: 'Pudahuel',
      modality: 'Presencial',
      salary: '$1.000.000 – $1.300.000',

      appliedDate: '10 sep 2026',
      status: 'Finalizada',

      compatibility: 74,

      cvId: 'cv-fullstack',
      cvName: 'CV Full Stack',
      expectedSalary: 1200000,

      viewed: true,
      viewedDate: '11 sep 2026 · 15:07',

      feedback:
        'El proceso finalizó. La empresa decidió continuar con otro perfil para esta posición.',

      communication: {
        email: true,
        whatsapp: false,
      },

      timeline: [
        {
          date: '10 sep',
          title: 'Postulación enviada',
          description:
            'Tu postulación fue enviada correctamente.',
          completed: true,
        },
        {
          date: '11 sep',
          title: 'CV revisado',
          description:
            'La empresa revisó tu CV.',
          completed: true,
        },
        {
          date: '12 sep',
          title: 'En revisión',
          description:
            'Tu perfil fue revisado durante el proceso.',
          completed: true,
        },
        {
          date: '15 sep',
          title: 'Entrevista',
          description:
            'Participaste en una entrevista.',
          completed: true,
        },
        {
          date: '18 sep',
          title: 'Proceso finalizado',
          description:
            'La empresa cerró el proceso de selección.',
          completed: true,
          current: true,
        },
      ],
    },
  ]);


  // =========================================================
  // CV SELECCIONADO PARA VISUALIZAR
  // =========================================================

  readonly showCvModal = signal(false);

  readonly selectedCv = signal<CvPreview | undefined>(undefined);


  // =========================================================
  // INFORMACIÓN DE LOS CV DISPONIBLES
  // =========================================================

  readonly cvPreviews: CvPreview[] = [
    {
      id: 'cv-fullstack',
      name: 'CV Full Stack',
      fileName: 'lucas-campos-cv.pdf',
      language: 'Español',
    },
    {
      id: 'cv-data',
      name: 'CV Data',
      fileName: 'lucas-campos-data.pdf',
      language: 'Español',
    },
  ];


  // =========================================================
  // POSTULACIÓN SELECCIONADA
  // =========================================================

  selectedApplicationId = signal<number>(1);


  selectedApplication = computed(() => {

    const applications = this.filteredApplications();

    if (applications.length === 0) {
      return undefined;
    }

    const selectedId = this.selectedApplicationId();

    return (
      applications.find(
        (application) => application.id === selectedId,
      ) ?? applications[0]
    );
  });


  // =========================================================
  // POSTULACIONES FILTRADAS
  // =========================================================

  filteredApplications = computed(() => {

    const query = this.searchQuery()
      .trim()
      .toLowerCase();

    const filter = this.selectedFilter();

    return this.applications().filter((application) => {

      const matchesSearch =
        !query ||
        application.jobTitle
          .toLowerCase()
          .includes(query) ||
        application.company
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === 'Todas' ||
        application.status === filter;

      return matchesSearch && matchesFilter;
    });
  });


  // =========================================================
  // MODALES / ASISTENTE
  // =========================================================

  showAssistant = signal(false);

  showInformationModal = signal(false);


  // =========================================================
  // CAMPOS DEL MODAL
  // =========================================================

  availability = signal('');

  powerBiExperience = signal('');

  additionalInformation = signal('');


  // =========================================================
  // CAMBIAR FILTRO
  // =========================================================

  setFilter(
    filter: 'Todas' | ApplicationStatus,
  ) {

    this.selectedFilter.set(filter);

  }


  // =========================================================
  // SELECCIONAR POSTULACIÓN
  // =========================================================

  selectApplication(id: number) {

    this.selectedApplicationId.set(id);

    this.showAssistant.set(false);

  }


  // =========================================================
  // ABRIR CV UTILIZADO
  // =========================================================

  openCv(): void {

    const application = this.selectedApplication();

    if (!application) {
      return;
    }

    const cv = this.cvPreviews.find(
      (item) => item.id === application.cvId,
    );

    if (!cv) {
      return;
    }

    this.selectedCv.set(cv);
    this.showCvModal.set(true);

  }


  // =========================================================
  // CERRAR VISOR DE CV
  // =========================================================

  closeCv(): void {

    this.showCvModal.set(false);
    this.selectedCv.set(undefined);

  }


  // =========================================================
  // ESTILOS DE ESTADO
  // =========================================================

  getStatusClasses(
    status: ApplicationStatus,
  ): string {

    switch (status) {

      case 'Enviada':
        return 'bg-slate-100 text-slate-600';

      case 'En revisión':
        return 'bg-amber-50 text-amber-700';

      case 'Evaluación':
        return 'bg-violet-50 text-violet-700';

      case 'Entrevista':
        return 'bg-blue-50 text-blue-700';

      case 'Oferta':
        return 'bg-emerald-50 text-emerald-700';

      case 'Finalizada':
        return 'bg-slate-100 text-slate-500';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }


  // =========================================================
  // ESTILOS DE PUNTOS DEL TIMELINE
  // =========================================================

  getTimelineDotClasses(
    event: TimelineEvent,
  ): string {

    if (event.current) {

      return 'bg-[#0BAFA5] ring-4 ring-[#0BAFA5]/10';

    }

    if (event.completed) {

      return 'bg-[#0BAFA5]';

    }

    return 'bg-slate-200';

  }


  // =========================================================
  // ASISTENTE
  // =========================================================

  toggleAssistant() {

    this.showAssistant.update(
      (visible) => !visible,
    );

  }


  // =========================================================
  // MODAL INFORMACIÓN
  // =========================================================

  openInformationModal() {

    if (!this.selectedApplication()?.pendingInformation) {
      return;
    }

    this.availability.set('');
    this.powerBiExperience.set('');
    this.additionalInformation.set('');

    this.showInformationModal.set(true);

  }


  closeInformationModal() {

    this.showInformationModal.set(false);

  }


  // =========================================================
  // GUARDAR INFORMACIÓN
  // =========================================================

  saveInformation() {

    const application = this.selectedApplication();

    if (
      !application ||
      !this.availability() ||
      !this.powerBiExperience()
    ) {
      return;
    }


    this.applications.update((applications) =>
      applications.map((item) => {

        if (item.id !== application.id) {
          return item;
        }

        return {
          ...item,
          pendingInformation: undefined,
        };

      }),
    );


    this.showInformationModal.set(false);

  }

}