import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private mssgService: MessageService,
    private route: Router,
    private zone: NgZone
  ) {}

  // After the view initializes, load the Google button script and render the Google button
  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      google.accounts.id.initialize({
        client_id: '1044121505656-t93nlbj4ajs3c7eondg8ta5eij1e03ih.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleSignUp(response)
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'medium',
        shape: 'rectangle',
        type: 'standard',
        text: "signup_with"
      });
    };
  }

  // Decode the Google token
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // Handle Google sign-up response
  handleGoogleSignUp(response: any) {
    const payload = this.decodeToken(response.credential);
    sessionStorage.setItem('signUpUser', JSON.stringify(payload));

    const signUpUser = JSON.parse(sessionStorage.getItem('signUpUser') || '{}');
    let postDetails = {
      fullname: signUpUser.name,
      email: signUpUser.email,
    };

    // Check if user with this email already exists
    this.auth.getUserByEmail(postDetails.email as string).subscribe({
      next: (response: User[]) => {
        this.zone.run(() => {
          if (response.length > 0) {
            // User with this email already exists
            this.mssgService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User with this email already exists',
              life: 1000
            });
          } else {
            // User does not exist, proceed with registration
            this.auth.registerUser(postDetails as User).subscribe({
              next: () => {
                this.mssgService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Registered Successfully',
                  life: 1000
                });
                this.route.navigate(['signIn']);
              },
              error: (err) => {
                this.mssgService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Something went wrong',
                  life: 1000
                });
              },
            });
          }
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.mssgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to check user',
            life: 1000
          });
        });
      },
    });
  }

  // Form group for sign-up form with validators
  registerForm = this.fb.group({
    fullname: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  // Submit sign-up form
  submitForm() {
    const postDetails = { ...this.registerForm.value };
    delete postDetails.confirmPassword;

    // Check if user with this email already exists
    this.auth.getUserByEmail(postDetails.email as string).subscribe({
      next: (response: User[]) => {
        if (response.length > 0) {
          // User with this email already exists
          this.mssgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User with this email already exists',
            life: 1000
          });
        } else {
          // User does not exist, proceed with registration
          this.auth.registerUser(postDetails as User).subscribe({
            next: () => {
              this.mssgService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Registered Successfully',
                life: 1000
              });
              this.route.navigate(['signIn']);
            },
            error: (err) => {
              this.mssgService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Something went wrong',
                life: 1000
              });
            },
          });
        }
      },
      error: (err) => {
        this.mssgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to check user',
          life: 1000
        });
      },
    });
  }
}
