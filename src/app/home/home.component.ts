import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' // Fix: Change 'styleUrl' to 'styleUrls' to specify an array of style URLs
})
export class HomeComponent {
  // Property to check if the user is authenticated based on sessionStorage
  isUser: boolean = !!sessionStorage.getItem('id'); // !! operator converts sessionStorage.getItem('id') to a boolean
}
