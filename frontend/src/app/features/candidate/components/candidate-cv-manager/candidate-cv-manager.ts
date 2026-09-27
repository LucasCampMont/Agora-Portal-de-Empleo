import { Component, signal } from '@angular/core';

interface CandidateCv {
  id: string;
  name: string;
  fileName: string;
  language: string;
  isPrimary: boolean;
}

type CvTab = 'documents' | 'analysis' | 'letter';

@Component({
  selector: 'app-candidate-cv-manager',
  imports: [],
  templateUrl: './candidate-cv-manager.html',
})
export class CandidateCvManager {
  readonly activeTab = signal<CvTab>('documents');
  readonly notice = signal('');

  readonly cvs = signal<CandidateCv[]>([
    {
      id: 'cv-fullstack',
      name: 'CV Full Stack',
      fileName: 'lucas-campos-cv.pdf',
      language: 'Español',
      isPrimary: true,
    },
    {
      id: 'cv-data',
      name: 'CV Data',
      fileName: 'lucas-campos-data.pdf',
      language: 'Español',
      isPrimary: false,
    },
  ]);

  readonly selectedCvId = signal('cv-fullstack');

  setTab(tab: CvTab): void {
    this.activeTab.set(tab);
    this.notice.set('');
  }

  selectCv(id: string): void {
    this.selectedCvId.set(id);
    this.notice.set('');
  }

  setPrimary(id: string): void {
    this.cvs.update((items) =>
      items.map((cv) => ({ ...cv, isPrimary: cv.id === id })),
    );
    this.notice.set('CV principal actualizado en esta vista de prueba.');
  }

  addCv(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const id = crypto.randomUUID();

    this.cvs.update((items) => [
      ...items,
      {
        id,
        name: file.name.replace(/\.[^.]+$/, ''),
        fileName: file.name,
        language: 'Por identificar',
        isPrimary: false,
      },
    ]);

    this.selectedCvId.set(id);
    this.notice.set(
      'Archivo agregado solo a esta vista; aún falta conectar el guardado.',
    );
    input.value = '';
  }

  requestAi(feature: string): void {
    this.notice.set(
      `${feature}: falta conectar el servicio de IA. Esta pantalla es una maqueta.`,
    );
  }
}