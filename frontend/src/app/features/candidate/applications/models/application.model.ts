export type ApplicationStatus =
  | 'Enviada'
  | 'En revisión'
  | 'Evaluación'
  | 'Entrevista'
  | 'Oferta'
  | 'Finalizada';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface PendingInformation {
  title: string;
  description: string;
  fields: string[];
}

export interface Evaluation {
  title: string;
  status: string;
  deadline?: string;
}

export interface Interview {
  date: string;
  time: string;
  type: string;
  platform?: string;
  meetingUrl?: string;
}

export interface Communication {
  email?: boolean;
  whatsapp?: boolean;
}

export interface Application {
  id: number;

  jobTitle: string;
  company: string;

  location: string;
  modality: string;
  salary: string;

  appliedDate: string;
  status: ApplicationStatus;

  compatibility: number;

  cvId: string;
  cvName: string;
  expectedSalary: number;

  viewed: boolean;
  viewedDate?: string;

  applicantsInProcess?: number;

  pendingInformation?: PendingInformation;

  evaluation?: Evaluation;

  interview?: Interview;

  feedback?: string;

  communication?: Communication;

  timeline: TimelineEvent[];
}

export interface CvPreview {
  id: string;
  name: string;
  fileName: string;
  language: string;
}