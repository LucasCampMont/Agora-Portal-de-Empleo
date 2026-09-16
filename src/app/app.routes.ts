import { Routes } from '@angular/router';

import { Login } from './features/auth/pages/login/login';
import { Home } from './features/home/pages/home/home';

import { CandidateLayout } from './layout/candidate-layout/candidate-layout';

import { CandidateHome } from './features/candidate/pages/candidate-home/candidate-home';
import { Setup } from './features/candidate/pages/setup/setup';
import { CandidatesJob } from './features/jobs/pages/candidates-job/candidates-job';

export const routes: Routes = [

  {
    path: '',
    component: Home,
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'candidate',
    component: CandidateLayout,

    children: [

      {
        path: '',
        component: CandidateHome,
      },

      {
        path: 'setup',
        component: Setup,
      },

      {
        path: 'jobs',
        component: CandidatesJob,
      },

    ],
  },

];
