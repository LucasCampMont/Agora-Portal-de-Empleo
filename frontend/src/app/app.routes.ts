import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home/home').then(
        (module) => module.Home,
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(
        (module) => module.Login,
      ),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register').then(
        (module) => module.Register,
      ),
  },

  {
    path: 'jobs',
    redirectTo: '/candidate/jobs',
    pathMatch: 'full',
  },

  // =========================
  // CANDIDATO
  // =========================
  {
    path: 'candidate',
    loadComponent: () =>
      import('./layout/candidate-layout/candidate-layout').then(
        (module) => module.CandidateLayout,
      ),

    children: [
      // =========================
      // INICIO
      // =========================
      {
        path: '',
        loadComponent: () =>
          import(
            './features/candidate/pages/candidate-home/candidate-home'
          ).then((module) => module.CandidateHome),
      },

      // =========================
      // CONFIGURACIÓN INICIAL
      // =========================
      {
        path: 'setup',
        loadComponent: () =>
          import('./features/candidate/pages/setup/setup').then(
            (module) => module.Setup,
          ),
      },

      // =========================
      // EMPLEOS
      // =========================
      {
        path: 'jobs',
        loadComponent: () =>
          import(
            './features/jobs/pages/candidates-job/candidates-job'
          ).then((module) => module.CandidatesJob),
      },

      {
        path: 'recommended',
        loadComponent: () =>
          import(
            './features/candidate/recommended-jobs/recommended-jobs'
          ).then((module) => module.RecommendedJobs),
      },

      // =========================
      // POSTULACIONES
      // =========================
      {
        path: 'applications',
        loadComponent: () =>
          import(
            './candidate/features/applications/candidates-applications/candidates-applications'
          ).then((module) => module.CandidatesApplications),
      },

      // =========================
      // NOTIFICACIONES
      // =========================
      {
        path: 'notifications',
        loadComponent: () =>
          import(
            './features/candidate/notifications/notifications'
          ).then((module) => module.Notifications),
      },

      // =========================
      // FORMULARIOS Y RESPUESTAS
      // =========================
      {
        path: 'answers',
        loadComponent: () =>
          import(
            './features/candidate/application-answers/application-answers'
          ).then((module) => module.ApplicationAnswers),
      },

      // =========================
      // EVALUACIONES
      // =========================
      {
        path: 'evaluations',
        loadComponent: () =>
          import(
            './features/candidate/evaluations/evaluations'
          ).then((module) => module.Evaluations),
      },
      {
        path: 'flash-requests',
        loadComponent: () =>
          import(
            './features/candidate/flash-requests/flash-requests'
          ).then((module) => module.FlashRequests),
      },
      // =========================
      // ASISTENTE ÁGORA
      // =========================
      {
        path: 'assistant',
        loadComponent: () =>
          import(
            './features/candidate/assistant/assistant'
          ).then((module) => module.Assistant),
      },
    ],
  },

  // =========================
  // RECLUTADOR
  // =========================
  {
    path: 'recruiter',
    loadComponent: () =>
      import('./layout/recruiter-layout/recruiter-layout').then(
        (module) => module.RecruiterLayout,
      ),

    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './features/recruiter/pages/recruiter-home/recruiter-home'
          ).then((module) => module.RecruiterHome),
      },

      {
        path: 'vacantes',
        loadComponent: () =>
          import(
            './features/recruiter/pages/recruiter-vacancies/recruiter-vacancies'
          ).then((module) => module.RecruiterVacancies),
      },
    ],
  },

  // =========================
  // CUALQUIER RUTA DESCONOCIDA
  // =========================
  {
    path: '**',
    redirectTo: '',
  },
];