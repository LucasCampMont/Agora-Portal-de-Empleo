import { Injectable } from '@angular/core';

import { CvPreview } from '../applications/models/application.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateCvService {

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
}