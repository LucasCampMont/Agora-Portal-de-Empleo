import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type FlashRequestStatus = 'Pendiente' | 'Aceptada' | 'Rechazada';

interface FlashRequest {
  id: number;
  company: string;
  role: string;
  location: string;
  modality: string;
  salary: string;
  receivedAt: string;
  recruiter: string;
  message: string;
  process: string;
  status: FlashRequestStatus;
}

@Component({
  selector: 'app-flash-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flash-requests.html',
})
export class FlashRequests {
  readonly requests = signal<FlashRequest[]>([
    {
      id: 1,
      company: 'TechNova Chile',
      role: 'Analista de Datos',
      location: 'Santiago, Chile',
      modality: 'Híbrido',
      salary: '$1.400.000 - $1.700.000',
      receivedAt: 'Hoy, 18:42',
      recruiter: 'María González · Talent Acquisition',
      message:
        'Vimos tu perfil y experiencia en análisis de datos. Nos gustaría saber si estás disponible para avanzar rápidamente en nuestro proceso de selección.',
      process:
        'Entrevista inicial → Evaluación técnica → Entrevista final',
      status: 'Pendiente',
    },
    {
      id: 2,
      company: 'Fintech Solutions',
      role: 'Ingeniero de Datos Jr.',
      location: 'Santiago, Chile',
      modality: 'Remoto',
      salary: '$1.300.000 - $1.600.000',
      receivedAt: 'Ayer, 11:20',
      recruiter: 'Felipe Martínez · Recruitment',
      message:
        'Tu experiencia con Python y SQL coincide con lo que estamos buscando. Queremos invitarte a participar en nuestro proceso.',
      process:
        'Revisión de perfil → Entrevista → Evaluación técnica',
      status: 'Pendiente',
    },
  ]);

  readonly selectedRequest = signal<FlashRequest | null>(null);

  readonly pendingRequests = computed(
    () =>
      this.requests().filter(
        (request) => request.status === 'Pendiente',
      ).length,
  );

  readonly processedRequests = computed(
    () =>
      this.requests().filter(
        (request) => request.status !== 'Pendiente',
      ).length,
  );

  openRequest(request: FlashRequest): void {
    this.selectedRequest.set(request);
  }

  closeRequest(): void {
    this.selectedRequest.set(null);
  }

  acceptRequest(id: number): void {
    this.updateStatus(id, 'Aceptada');
    this.closeRequest();
  }

  rejectRequest(id: number): void {
    this.updateStatus(id, 'Rechazada');
    this.closeRequest();
  }

  private updateStatus(
    id: number,
    status: FlashRequestStatus,
  ): void {
    this.requests.update((requests) =>
      requests.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
            }
          : request,
      ),
    );
  }

  getStatusClasses(status: FlashRequestStatus): string {
    switch (status) {
      case 'Aceptada':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700';

      case 'Rechazada':
        return 'border-slate-200 bg-slate-100 text-slate-600';

      case 'Pendiente':
        return 'border-amber-200 bg-amber-50 text-amber-700';
    }
  }
}