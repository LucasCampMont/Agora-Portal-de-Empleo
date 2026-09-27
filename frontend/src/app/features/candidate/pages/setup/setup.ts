import { Component, input } from '@angular/core';
import { CandidateCvManager } from '../../components/candidate-cv-manager/candidate-cv-manager';
import { CandidateProfileEditor } from '../../components/candidate-profile-editor/candidate-profile-editor';
export type SetupSection = 'profile' | 'cv' | 'settings';

@Component({
  selector: 'app-setup',
  imports: [CandidateCvManager, CandidateProfileEditor],
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
})
export class Setup {
  readonly section = input<SetupSection>('settings');
}