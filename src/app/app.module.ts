import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button'; // Import ButtonModule from PrimeNG
import { MegaMenuModule } from 'primeng/megamenu'; // Import MegaMenuModule from PrimeNG
import { InputTextModule } from 'primeng/inputtext'; // Import InputTextModule from PrimeNG
import { TooltipModule } from 'primeng/tooltip'; // Import TooltipModule from PrimeNG
import { SidebarModule } from 'primeng/sidebar'; // Import SidebarModule from PrimeNG
import { MenuModule } from 'primeng/menu'; // Import MenuModule from PrimeNG
import { ListboxModule } from 'primeng/listbox'; // Import ListboxModule from PrimeNG
import { OrderListModule } from 'primeng/orderlist'; // Import OrderListModule from PrimeNG
import { ToolbarModule } from 'primeng/toolbar'; // Import ToolbarModule from PrimeNG
import { DataViewModule } from 'primeng/dataview'; // Import DataViewModule from PrimeNG
import { CardModule } from 'primeng/card'; // Import CardModule from PrimeNG
import { DropdownModule } from 'primeng/dropdown'; // Import DropdownModule from PrimeNG
import { ToastModule } from 'primeng/toast'; // Import ToastModule from PrimeNG
import { DialogModule } from 'primeng/dialog'; // Import DialogModule from PrimeNG
import { InputTextareaModule } from 'primeng/inputtextarea'; // Import InputTextareaModule from PrimeNG
import { ChipsModule } from 'primeng/chips'; // Import ChipsModule from PrimeNG
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Import ConfirmDialogModule from PrimeNG
import { AutoCompleteModule } from 'primeng/autocomplete'; // Import AutoCompleteModule from PrimeNG
import { ScrollTopModule } from 'primeng/scrolltop'; // Import ScrollTopModule from PrimeNG
import { NavbarComponent } from './navbar/navbar.component'; // Import NavbarComponent
import { LinkListComponent } from './link-list/link-list.component'; // Import LinkListComponent
import { SignInComponent } from './sign-in/sign-in.component'; // Import SignInComponent
import { SignUpComponent } from './sign-up/sign-up.component'; // Import SignUpComponent
import { AboutComponent } from './about/about.component'; // Import AboutComponent
import { SortByPipe } from './Pipes/sorting.pipe'; // Import SortByPipe
import { UserProfileComponent } from './user-profile/user-profile.component'; // Import UserProfileComponent
import { HomeComponent } from './home/home.component'; // Import HomeComponent
import { ContactComponent } from './contact/contact.component'; // Import ContactComponent
import { MessageService } from 'primeng/api'; // Import MessageService from PrimeNG
import { ConfirmationService } from 'primeng/api';
import { NotFoundComponent } from './not-found/not-found.component'; // Import ConfirmationService from PrimeNG

@NgModule({
  declarations: [
    // Declare all the components used in the application
    AppComponent,
    NavbarComponent,
    LinkListComponent,
    SignInComponent,
    SignUpComponent,
    AboutComponent,
    SortByPipe,
    UserProfileComponent,
    HomeComponent,
    ContactComponent,
    NotFoundComponent,
  ],
  imports: [
    // Import all necessary modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    MegaMenuModule,
    InputTextModule,
    TooltipModule,
    SidebarModule,
    MenuModule,
    ListboxModule,
    OrderListModule,
    ToolbarModule,
    DataViewModule,
    CardModule,
    DropdownModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    ChipsModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    ScrollTopModule,
  ],
  providers: [
    // Provide necessary services
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent], // Specify the root component of the application
})
export class AppModule {}
