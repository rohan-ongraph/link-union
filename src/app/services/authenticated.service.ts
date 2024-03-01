import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authenticated {
  // Subject to track authentication status changes
  private isAuthenticatedSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }
  
  // Method to check if a user is logged in
  isLoggedIn(): Observable<boolean> {
    // Check if user is logged in based on session storage data
    const isLoggedIn = !!((sessionStorage.getItem('email') && sessionStorage.getItem('id')) || sessionStorage.getItem('loggedInUser'));
    // Return an observable of the authentication status
    return of(isLoggedIn);
  }

  // Method to set user as logged in
  loginUser(): void {
    // Set session storage flag and notify subscribers of authentication status change
    sessionStorage.setItem('isUser', 'true');
    this.setAuthChanged(true);
  }

  // Method to log out user
  logOut(): void {
    // Clear session storage and notify subscribers of authentication status change
    sessionStorage.clear();
    this.setAuthChanged(false);
  }

  // Method to notify subscribers of authentication status change
  setAuthChanged(isUserLoggedIn: boolean): void {
    this.isAuthenticatedSubject.next(isUserLoggedIn);
  }

  // Method to subscribe to authentication status changes
  authChanged(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
