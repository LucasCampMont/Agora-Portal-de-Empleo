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
  {
    path: 'candidate',
    loadComponent: () =>
      import('./layout/candidate-layout/candidate-layout').then(
        (module) => module.CandidateLayout,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/candidate/pages/candidate-home/candidate-home').then(
            (module) => module.CandidateHome,
          ),
      },
      {
        path: 'setup',
        loadComponent: () =>
          import('./features/candidate/pages/setup/setup').then(
            (module) => module.Setup,
          ),
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./features/jobs/pages/candidates-job/candidates-job').then(
            (module) => module.CandidatesJob,
          ),
      },
    ],
  },
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
          import('./features/recruiter/pages/recruiter-home/recruiter-home').then(
            (module) => module.RecruiterHome,
          ),
      },
      {
        path: 'vacantes',
        loadComponent: () =>
          import('./features/recruiter/pages/recruiter-vacancies/recruiter-vacancies').then(
            (module) => module.RecruiterVacancies,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];