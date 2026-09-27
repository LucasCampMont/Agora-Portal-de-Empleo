import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type VacancySummary = {
  title: string;
  area: string;
  location: string;
  applications: number;
  attention: string;
};

@Component({
  selector: 'app-recruiter-home',
  imports: [RouterLink],
  templateUrl: './recruiter-home.html',
  styleUrl: './recruiter-home.scss',
})
export class RecruiterHome {
  // Aquí van los datos de demostración de vacantes.
}
