import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import {
  ApplicationStatus,
  CvPreview,
  TimelineEvent,
} from '../models/application.model';

import { ApplicationsService } from '../services/applications.service';
import { CandidateCvService } from '../../services/candidate-cv.service';

@Component({
  selector: 'app-candidates-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidates-applications.html',
})
export class CandidatesApplications {

  private readonly applicationsService =
    inject(ApplicationsService);

  private readonly candidateCvService =
    inject(CandidateCvService);


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

  applications = this.applicationsService.applications;


  // =========================================================
  // CV SELECCIONADO PARA VISUALIZAR
  // =========================================================

  readonly showCvModal = signal(false);

  readonly selectedCv = signal<CvPreview | undefined>(undefined);


  // =========================================================
  // INFORMACIÓN DE LOS CV DISPONIBLES
  // =========================================================

  readonly cvPreviews =
    this.candidateCvService.cvPreviews;


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