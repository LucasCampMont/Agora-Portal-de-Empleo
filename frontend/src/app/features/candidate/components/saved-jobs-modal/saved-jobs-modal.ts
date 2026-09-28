import { Component, inject } from '@angular/core';
import { CandidateWindowService } from '../../../../layout/candidate-layout/candidate-windows.service';

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  modality: string;
  salary: string;
  experience: string;
  savedAt: string;
}

@Component({
  selector: 'app-saved-jobs-modal',
  imports: [],
  templateUrl: './saved-jobs-modal.html',
})
export class SavedJobsModal {
  private readonly windowService = inject(CandidateWindowService);

  readonly jobs: SavedJob[] = [
    {
      id: 1,
      title: 'Analista de Datos',
      company: 'Empresa Tecnológica',
      location: 'Santiago',
      modality: 'Híbrido',
      salary: '$1.100.000 – $1.400.000',
      experience: '1–2 años',
      savedAt: 'Guardado hace 2 días',
    },
    {
      id: 2,
      title: 'Desarrollador Junior',
      company: 'Compañía Digital',
      location: 'Santiago',
      modality: 'Remoto',
      salary: '$1.000.000 – $1.300.000',
      experience: 'Junior',
      savedAt: 'Guardado hace 4 días',
    },
    {
      id: 3,
      title: 'Analista BI',
      company: 'Servicios Empresariales',
      location: 'Las Condes',
      modality: 'Híbrido',
      salary: '$1.200.000 – $1.500.000',
      experience: '1–3 años',
      savedAt: 'Guardado hace 6 días',
    },
  ];

  close(): void {
    this.windowService.close();
  }

  removeJob(job: SavedJob): void {
    // Más adelante esto se conectará al estado real de empleos guardados.
    console.log('Eliminar empleo guardado:', job.title);
  }
}