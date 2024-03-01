import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Base URL for API requests
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  // Method to register a new user
  registerUser(userDetails: User): Observable<any> {
    // Initialize the list of data for the user
    userDetails.list = {
      data: []
    };
    // Send a POST request to the server to register the user
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  // Method to fetch user details by email
  getUserByEmail(email: string): Observable<User[]> {
    // Send a GET request to the server to fetch user details based on email
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  // Method to check if a user exists with a given email
  checkUserByEmail(email: string): Observable<User | null> {
    // Fetch user details by email and handle potential errors
    return this.getUserByEmail(email).pipe(
      map(users => {
        // Filter matching users based on email
        const matchingUsers = users.filter(user => user.email === email);
        // Return the first matching user if found, otherwise return null
        return matchingUsers.length > 0 ? matchingUsers[0] : null;
      }),
      catchError(() => of(null)) // Handle errors gracefully by returning null
    );
  }
}
