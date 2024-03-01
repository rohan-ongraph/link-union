import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Define a canActivate function as a constant
export const authGuard: CanActivateFn = (route, state) => {
    // Check if user is logged in based on session storage
    if (sessionStorage.getItem('email') || sessionStorage.getItem('loggedInUser')) {
        // If logged in, allow navigation
        return true;
    } else {
        // If not logged in, inject Router and redirect to the sign-in page
        const route = inject(Router); // Inject Router service
        return route.navigate(['signIn']); // Navigate to the sign-in page
    }
};
