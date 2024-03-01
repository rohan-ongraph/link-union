import { Component, OnInit } from '@angular/core';
import { userService } from '../services/userService.service';
import { User } from '../interfaces/auth';
import { Authenticated } from '../services/authenticated.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  constructor(
    private userService: userService,
    private authentication: Authenticated,
    private router: Router
  ) {}

  // Properties
  user!: User;
  username!: string;
  email!: string;
  userId: string | null = sessionStorage.getItem('id');
  userPic!: string;
  
  ngOnInit(): void {
    // Load user data on component initialization
    this.loadUserData();
  }

  // Method to load user data
  loadUserData(): void {
    // Retrieve user data from session storage
    const signUpUser = JSON.parse(sessionStorage.getItem('signUpUser') || sessionStorage.getItem('loggedInUser') || '{}');
    const userId = sessionStorage.getItem('id');

    // Set userPic from signUpUser data
    this.userPic = signUpUser.picture;
    
    // Check if userId is available
    if (userId) {
      // Fetch user data from the backend
      this.userService.getUserData(userId).subscribe({
        next: (user) => {
          // Assign user data to component properties
          this.user = user;
          this.username = user.fullname; 
          this.email = user.email;
        }
      });
    }
  }
  
  // Method to log out user
  logout(): void {
    // Call logout method from authentication service
    this.authentication.logOut();
    // Navigate to sign-in page
    this.router.navigate(['signIn']);
  }

  // Method to delete user account
  deleteUser(): void {
    // Check if userId is available
    if (this.userId) {
      // Call deleteUser method from user service
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          // Clear session storage
          sessionStorage.clear();
          // Navigate to sign-in page
          this.router.navigate(['signIn']);
        }
      });
    }
  }
}
