import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Authenticated } from '../services/authenticated.service';

declare var google: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private mssgService: MessageService,
    private route: Router,
    private ngZone: NgZone,
    private authenticated: Authenticated
  ) { }

  // Load and initialize Google Sign-In after the view has been initialized
  ngAfterViewInit(): void {
    // Load the Google button script asynchronously
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);

    // Initialize and render the Google button after the script has loaded
    script.onload = () => {
      google.accounts.id.initialize({
        client_id: '1044121505656-t93nlbj4ajs3c7eondg8ta5eij1e03ih.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleLogin(response)
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'medium',
        shape: 'rectangle',
        type: 'standard',
        text: "signin_with"
      });
    };
  }

  // Decode Google ID token
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  // Handle Google Sign-In response
  handleGoogleLogin(response: any) {
    // Decode Google ID token and store user data in session storage
    const payload = this.decodeToken(response.credential);
    sessionStorage.setItem('loggedInUser', JSON.stringify(payload));

    // Retrieve user data from session storage
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    const signUpUser = JSON.parse(sessionStorage.getItem('signUpUser') || '{}');

    // Check if user email matches signed-in email and is verified
    if (signUpUser.email === loggedInUser.email && signUpUser.email_verified && loggedInUser.email_verified) {
      // User email matches signed-in email and is verified
      // Navigate to list page and log in user
      sessionStorage.setItem('email', loggedInUser.email as string);
      this.authenticated.loginUser();
      this.ngZone.run(() => {
        this.route.navigate(['list']);
        this.showSuccessMessage('Successfully Logged in');
      });
    } else if (loggedInUser.email && loggedInUser.email_verified) {
      // User email is verified but not matching signed-in email
      // Check if email exists in database
      sessionStorage.setItem('email', loggedInUser.email as string);
      this.auth.getUserByEmail(loggedInUser.email as string).subscribe({
        next: (response) => {
          if (response.length > 0) {
            // Email exists in the database
            // Navigate to list page and log in user
            this.id = response[0].id;
            sessionStorage.setItem('id', this.id as string);
            this.authenticated.loginUser();
            this.ngZone.run(() => {
              this.route.navigate(['list']);
              this.showSuccessMessage('Successfully Logged in');
            });
          } else {
            // Email does not exist in the database
            this.showErrorMessage("User doesn't exist");
          }
        },
        error: (err) => {
          this.showErrorMessage("Something went wrong");
        }
      });
    } else {
      // User email is not verified
      this.ngZone.run(() => {
        this.showErrorMessage("User doesn't exist");
      });
    }
  }

  // Form group for sign-in form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  // Variable to store user ID
  id!: string;

  // Method to log in user
  loginUser() {
    // Retrieve email and password from form
    const { email, password } = this.loginForm.value;

    // Check if user exists and password is correct
    this.auth.getUserByEmail(email as string).subscribe({
      next: (response) => {
        if (response.length > 0 && response[0].password === password) {
          // User exists and password is correct
          // Navigate to list page and log in user
          this.id = response[0].id;
          sessionStorage.setItem('id', this.id as string);
          sessionStorage.setItem('email', email as string);
          this.authenticated.loginUser();
          this.ngZone.run(() => {
            this.route.navigate(['list']);
            this.showSuccessMessage('Successfully Logged in');
          });
        } else {
          // Incorrect email or password
          this.showErrorMessage('Wrong Email or Password');
        }
      },
      // If any error occurs
      error: (err) => {
        this.showErrorMessage('Something went wrong');
      }
    });
  }

  // Method to show success message
  private showSuccessMessage(message: string) {
    this.ngZone.run(() => {
      this.mssgService.add({ severity: 'success', summary: 'Success', detail: message });
    });
  }

  // Method to show error message
  private showErrorMessage(message: string) {
    this.ngZone.run(() => {
      //message alert
      this.mssgService.add({ severity: 'error', summary: 'Error', detail: message });
    });
  }
}