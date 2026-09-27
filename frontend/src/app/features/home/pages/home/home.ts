import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../../../../layout/application/components/navbar/navbar"
import { Footer } from "../../../../layout/application/components/footer/footer"

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
