import { Component, computed, signal } from '@angular/core';
import { JobSearchBar } from '../../components/job-search-bar/job-search-bar';

interface CandidateCv {
  id: string;
  fileName: string;
  label: string;
  updatedAt: string;
  file?: File;
}

interface ApplicationQuestion {
  id: string;
  prompt: string;
  type: 'short-text' | 'long-text' | 'single-choice';
  required: boolean;
  helpText?: string;
  options?: string[];
}

type ApplicationStep = 0 | 1 | 2 | 3;

@Component({
  selector: 'app-candidates-job',
  imports: [JobSearchBar],
  templateUrl: './candidates-job.html',
  styleUrl: './candidates-job.scss',
})
export class CandidatesJob {
  readonly showFilters = signal(false);
  readonly isApplicationOpen = signal(false);
  readonly applicationSent = signal(false);
  readonly applicationStep = signal<ApplicationStep>(0);

  readonly searchQuery = signal('');

  readonly applicationSteps = [
    { number: 1, label: 'Oferta' },
    { number: 2, label: 'Perfil y condiciones' },
    { number: 3, label: 'Preguntas' },
    { number: 4, label: 'Revisión' },
  ];

  // Datos de demostración; luego se cargarán desde el perfil del candidato.
  readonly candidateProfile = {
    fullName: 'Lucas Campos Montes',
    email: 'lucas.campos@example.com',
    phone: '+56 9 1234 5678',
    professionalTitle: 'Analista de Datos',
    location: 'Santiago, Chile',
  };

  readonly cvs = signal<CandidateCv[]>([
    {
      id: 'cv-1',
      fileName: 'lucas-campos-cv.pdf',
      label: 'CV Full Stack',
      updatedAt: 'Actualizado el 12 de septiembre',
    },
    {
      id: 'cv-2',
      fileName: 'lucas-campos-data.pdf',
      label: 'CV Data',
      updatedAt: 'Actualizado el 3 de agosto',
    },
  ]);

  readonly selectedCvId = signal<string | null>('cv-1');

  readonly selectedCv = computed(
    () => this.cvs().find((cv) => cv.id === this.selectedCvId()) ?? null,
  );

  readonly expectedSalary = signal('');

  // Preguntas de ejemplo: después vendrán configuradas por la empresa.
  readonly applicationQuestions: ApplicationQuestion[] = [
    {
      id: 'data-experience',
      prompt: '¿Qué experiencia tienes preparando reportes para apoyar decisiones de negocio?',
      type: 'long-text',
      required: true,
      helpText: 'Describe brevemente un ejemplo concreto.',
    },
    {
      id: 'power-bi-level',
      prompt: '¿Cuál es tu nivel de experiencia usando Power BI?',
      type: 'single-choice',
      required: true,
      options: ['Básico', 'Intermedio', 'Avanzado'],
    },
  ];

  readonly applicationAnswers = signal<Record<string, string>>({});

  readonly vacancySkills = [
    { name: 'SQL', matches: true },
    { name: 'Python', matches: true },
    { name: 'Power BI', matches: false },
  ];

  handleSearch(query: string): void {
    this.searchQuery.set(query);
  }

  toggleFilters(): void {
    this.showFilters.update((isOpen) => !isOpen);
  }

  startApplication(): void {
    this.applicationStep.set(0);
    this.applicationSent.set(false);
    this.isApplicationOpen.set(true);
  }

  returnToOffer(): void {
    this.isApplicationOpen.set(false);
  }

  goToApplicationStep(step: number): void {
    if (step >= 0 && step <= 3) {
      this.applicationStep.set(step as ApplicationStep);
    }
  }

  nextApplicationStep(): void {
    const currentStep = this.applicationStep();

    if (currentStep === 1 && !this.selectedCvId()) {
      return;
    }

    if (currentStep === 2 && !this.hasAnsweredRequiredQuestions()) {
      return;
    }

    if (currentStep < 3) {
      this.applicationStep.set((currentStep + 1) as ApplicationStep);
    }
  }

  previousApplicationStep(): void {
    const currentStep = this.applicationStep();

    if (currentStep === 0) {
      this.returnToOffer();
      return;
    }

    this.applicationStep.set((currentStep - 1) as ApplicationStep);
  }

  selectCv(cvId: string): void {
    this.selectedCvId.set(cvId);
  }

  addCv(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const newCv: CandidateCv = {
      id: crypto.randomUUID(),
      fileName: file.name,
      label: file.name.replace(/\.pdf$/i, ''),
      updatedAt: 'Agregado para esta postulación',
      file,
    };

    this.cvs.update((currentCvs) => [...currentCvs, newCv]);
    this.selectedCvId.set(newCv.id);
    input.value = '';
  }

  updateExpectedSalary(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.expectedSalary.set(input.value);
  }

  updateApplicationAnswer(questionId: string, event: Event): void {
    const input = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    this.applicationAnswers.update((answers) => ({
      ...answers,
      [questionId]: input.value,
    }));
  }

  private hasAnsweredRequiredQuestions(): boolean {
    return this.applicationQuestions
      .filter((question) => question.required)
      .every((question) => this.applicationAnswers()[question.id]?.trim());
  }

  submitApplication(): void {
    if (!this.selectedCvId() || !this.hasAnsweredRequiredQuestions()) {
      return;
    }

    // Confirmación local: aún no se envía información al backend.
    this.applicationSent.set(true);
  }
}