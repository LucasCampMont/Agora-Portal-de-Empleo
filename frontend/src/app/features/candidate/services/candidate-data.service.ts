import { Injectable, signal } from '@angular/core';

export type CareerStage =
  | 'student'
  | 'recent-graduate'
  | 'first-job'
  | 'experienced'
  | 'career-change'
  | '';

export type ExperienceLevel =
  | 'intern'
  | 'junior'
  | 'semi-senior'
  | 'senior'
  | '';

export interface CandidateProfile {
  fullName: string;
  photoFileName: string;
  email: string;
  phone: string;
  professionalTitle: string;
  career: string;
  careerStage: CareerStage;
  experienceLevel: ExperienceLevel;
  summary: string;
  activelySearching: boolean;
  visibleToCompanies: boolean;
  desiredRoles: string;
  desiredAreas: string;
  location: string;
  workMode: string;
  experience: string;
  education: string;
  complementaryStudies: string;
  certifications: string;
  skills: string;
  languages: string;
  references: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface SavedApplicationAnswer {
  questionId: string;
  answer: string;
}

const initialProfile: CandidateProfile = {
  fullName: 'Lucas Campos Montes',
  photoFileName: '',
  email: 'lucas.campos@example.com',
  phone: '+56 9 1234 5678',
  professionalTitle: 'Analista de Datos',
  career: '',
  careerStage: '',
  experienceLevel: '',
  summary: '',
  activelySearching: true,
  visibleToCompanies: false,
  desiredRoles: '',
  desiredAreas: '',
  location: 'Santiago, Chile',
  workMode: '',
  experience: '',
  education: '',
  complementaryStudies: '',
  certifications: '',
  skills: '',
  languages: '',
  references: '',
  linkedin: '',
  github: '',
  portfolio: '',
};

@Injectable({ providedIn: 'root' })
export class CandidateDataService {
  private readonly profileState = signal<CandidateProfile>({
    ...initialProfile,
  });

  readonly profile = this.profileState.asReadonly();

  private readonly savedAnswersState = signal<
    Record<string, SavedApplicationAnswer>
  >({});

  readonly savedAnswers = this.savedAnswersState.asReadonly();

  saveProfile(profile: CandidateProfile): void {
    this.profileState.set({ ...profile });
  }

  getSavedAnswer(questionId: string): string {
    return this.savedAnswersState()[questionId]?.answer ?? '';
  }

  saveAnswer(questionId: string, answer: string): void {
    this.savedAnswersState.update((answers) => ({
      ...answers,
      [questionId]: { questionId, answer },
    }));
  }

  removeAnswer(questionId: string): void {
    this.savedAnswersState.update((answers) => {
      const updated = { ...answers };
      delete updated[questionId];
      return updated;
    });
  }
}