import { Component, computed, signal } from '@angular/core';

type VacancyStatus = 'publicada'  | 'borrador';
type StatusFilter = 'todas'  | VacancyStatus;

type Vacancy = {
  id: number;
  title: string;
  area: string;
  location: string;
  applications: number;
  status: VacancyStatus;
  updatedAt: string;
};

@Component({
  selector: 'app-recruiter-vacancies',
  templateUrl: './recruiter-vacancies.html',
  styleUrl: './recruiter-vacancies.scss',
})
export class RecruiterVacancies {

  readonly searchTerm = signal('');
  readonly selectedStatus = signal<StatusFilter>('todas');
  readonly vacancies = signal<Vacancy[]>([
    {
      id: 1,
      title: 'Operador/a de bodega',
      area: 'Operaciones',
      location: 'Santiago · Presencial',
      applications: 24,
      status: 'publicada',
      updatedAt: 'Actualizada hoy',
    },
    {
      id: 2,
      title: 'Técnico/a de mantenimiento',
      area: 'Servicios técnicos',
      location: 'Valparaíso · Presencial',
      applications: 12,
      status: 'publicada',
      updatedAt: 'Actualizada ayer',
    },
    {
      id: 3,
      title: 'Asistente administrativo/a',
      area: 'Administración',
      location: 'Remoto · Chile',
      applications: 0,
      status: 'borrador',
      updatedAt: 'Borrador',
    },
  ]);
 readonly visibleVacancies = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.vacancies().filter((vacancy) => {
      const matchesSearch =
        term.length === 0 ||
        `${vacancy.title} ${vacancy.area} ${vacancy.location}`
          .toLowerCase()
          .includes(term);

      const matchesStatus =
        status === 'todas' || vacancy.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  setStatus(status: StatusFilter): void {
    this.selectedStatus.set(status);
  }







}
