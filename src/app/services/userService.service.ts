import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable, mergeMap } from 'rxjs';
import { Data } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private baseUrl = 'http://localhost:3000'; // Path to your db.json file in the assets folder

  constructor(private http: HttpClient) {}

  // Method to fetch user data from the server
  getUserData(userId: string): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.get<User>(url);
  }

  // Method to add a new entry to user data on the server
  setUserData(data: Data, userId: string): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.get<User>(url).pipe(
      mergeMap((userData) => {
        // Add new entry to the list.data array
        userData.list.data.push(data);
        // Update user data on the server
        return this.http.patch(url, { list: userData.list });
      })
    );
  }

  // Method to delete all user data
  deleteAllUserData(userId: string): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.patch(url, { list: { data: [] } });
  }

  // Method to update user data on the server
  updateUserData(userId: string, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.patch(url, updatedData);
  }

  // Method to delete specific user data
  deleteUserData(userId: string, updatedData: any): Observable<any>{
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.patch(url, updatedData);
  }

  // Method to delete user account
  deleteUser(userId: string): Observable<any>{
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.delete(url)
  }

  // Method to contact user
  contactUser(data: any): Observable<any>{
    const url = `${this.baseUrl}/contactForm`;
    return this.http.post<any>(url, data)
  }
}
