import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkListComponent } from './link-list/link-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './guards/auth.guard'; // Import the authGuard from guards
import { AboutComponent } from './about/about.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  // Define the routes for each component
  {
    path: '', // Default route to HomeComponent
    component: HomeComponent
  },
  {
    path: 'list', // Route for LinkListComponent
    component: LinkListComponent,
    canActivate: [authGuard] // Apply AuthGuard for access control
  },
  {
    path: 'signUp', // Route for SignUpComponent
    component: SignUpComponent
  },
  {
    path: 'signIn', // Route for SignInComponent
    component: SignInComponent
  },
  {
    path: 'about', // Route for AboutComponent
    component: AboutComponent,
    canActivate: [authGuard] // Apply AuthGuard for access control
  },
  {
    path: 'profile', // Route for UserProfileComponent
    component: UserProfileComponent,
    canActivate: [authGuard] // Apply AuthGuard for access control
  },
  {
    path: 'contact', // Route for ContactComponent
    component: ContactComponent,
    canActivate: [authGuard] // Apply AuthGuard for access control
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Set up the RouterModule with the defined routes
  exports: [RouterModule] // Export the RouterModule for use in AppModule
})
export class AppRoutingModule { }
