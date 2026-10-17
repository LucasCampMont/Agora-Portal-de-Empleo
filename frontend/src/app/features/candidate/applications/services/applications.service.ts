import { Injectable, signal } from '@angular/core';

import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {

  readonly applications = signal<Application[]>([
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
}