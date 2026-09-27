import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CandidateDataService,
  CandidateProfile,
} from '../../services/candidate-data.service';

@Component({
  selector: 'app-candidate-profile-editor',
  imports: [FormsModule],
  templateUrl: './candidate-profile-editor.html',
})
export class CandidateProfileEditor {
  private readonly candidateData = inject(CandidateDataService);

  readonly savedMessage = signal('');

  profile: CandidateProfile = {
    ...this.candidateData.profile(),
  };

  selectPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.profile.photoFileName = file.name;
    this.savedMessage.set(
      'Foto seleccionada para esta sesión. Aún no se almacena el archivo.',
    );
  }

  saveProfile(): void {
    this.candidateData.saveProfile(this.profile);
    this.savedMessage.set('Perfil actualizado para esta sesión.');
  }
}