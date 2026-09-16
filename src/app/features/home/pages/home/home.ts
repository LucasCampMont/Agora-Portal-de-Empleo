import { Component } from '@angular/core';
import { Navbar } from "../../../../layout/application/components/navbar/navbar"
import { Footer } from "../../../../layout/application/components/footer/footer"

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
