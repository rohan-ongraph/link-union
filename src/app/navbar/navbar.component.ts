import { Component, HostListener, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Authenticated } from '../services/authenticated.service';
import { userService } from '../services/userService.service';
import { User } from '../interfaces/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Link-Union'; // Title for the navbar
  sidebarVisible = false; // Flag to control sidebar visibility
  isScreenLargeEnough = window.innerWidth >= 575; // Flag to track screen size
  items!: MegaMenuItem[]; // Array of menu items for mega menu
  items1!: MenuItem[]; // Array of menu items for regular menu
  user: User | undefined; // Current logged-in user
  userName:string = ''; // User's name
  isUser: boolean = sessionStorage.getItem('isUser')==='true'; // Flag to track user authentication status

  constructor(
    private authetication: Authenticated, // Authentication service
    private userService: userService, // User service
  ) {}

  // Function to update menu items based on screen size
  updateMenuItems(): void {
    if (!this.isScreenLargeEnough) {
      // If screen size is small, show basic menu items
      this.items = [];
      this.items1 = [
        { label: 'Home', routerLink: '/' },
        { label: 'List', routerLink: 'list' },
        { label: 'Contact', routerLink: 'contact' },
        { label: 'About', routerLink: 'about' },
        { label: 'Profile', routerLink: 'profile' }
      ];
    } else {
      // If screen size is large, show mega menu items
      this.items = [
        { label: 'Home', routerLink: '/' },
        { label: 'List', routerLink: 'list' },
        { label: 'Contact', routerLink: 'contact' },
        { label: 'About', routerLink: 'about' }
      ];
      this.items1 = [];
    }
  }
  
  // Host listener for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update screen size flag and menu items accordingly
    this.isScreenLargeEnough = window.innerWidth >= 575;
    this.updateMenuItems();
  }

  ngOnInit(): void {
    // Initialize component
    this.loadUserData(); // Load user data
    this.updateMenuItems(); // Update menu items based on initial screen size
    // Subscribe to authentication changes
    this.authetication.authChanged().subscribe(isLoggedUser => {
      this.isUser = isLoggedUser; // Update user authentication status
      sessionStorage.setItem('isUser', isLoggedUser.toString()); // Store authentication status in session storage
      this.loadUserData(); // Reload user data
    });
  }

  // Function to load user data
  loadUserData(): void {
    const userId = sessionStorage.getItem('id'); // Get user ID from session storage
    if (userId) {
      // If user ID exists, fetch user data
      this.userService.getUserData(userId).subscribe({
        next: (user) => {
          this.user = user; // Assign user data
          this.userName = user.fullname; // Assign user's full name
        }
      });
    } else {
      // If user ID does not exist, reset user name
      this.userName = "";
    }
  }

  email = sessionStorage.getItem('email'); // Get user email from session storage
}
