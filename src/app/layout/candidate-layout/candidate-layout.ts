import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../application/components/navbar/navbar';
import { CandidateSidebar } from '../candidate-sidebar/candidate-sidebar';
import { Footer } from '../application/components/footer/footer';

@Component({
  selector: 'app-candidate-layout',
  imports: [
    Navbar,
    CandidateSidebar,
    RouterOutlet,
    Footer
  ],
  templateUrl: './candidate-layout.html',
  styleUrl: './candidate-layout.scss',
})
export class CandidateLayout {}