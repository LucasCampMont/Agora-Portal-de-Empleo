import { Component } from '@angular/core';
import { Navbar } from "../../../../layout/application/components/navbar/navbar"

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
