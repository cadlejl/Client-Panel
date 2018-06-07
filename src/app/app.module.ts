import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// Experimental: the following fixed a console error about no provider for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { ClientService } from './services/client.service';
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./guards/auth.guard";
import { RegisterGuardService } from "./guards/register.guard";
import { SettingsService } from "./services/settings.service";

const appRoutes: Routes = [
  { 
    path: "", component: DashboardComponent, 
    canActivate: [AuthGuardService] 
  },
  { 
    path: "register", 
    component: RegisterComponent,
    canActivate: [RegisterGuardService]
  },
  { 
    path: "login", 
    component: LoginComponent 
  },
  { 
    path: "add-client", 
    component: AddClientComponent, 
    canActivate: [AuthGuardService] 
  },
  { 
    path: "client/:id", 
    component: ClientDetailsComponent, 
    canActivate: [AuthGuardService] 
  },
  { 
    path: "edit-client/:id", 
    component: EditClientComponent, 
    canActivate: [AuthGuardService] 
  }
];

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDPSHOGb8M3mALzSW8rSei2-xGUc11IdSA",
  authDomain: "client-panel-e0b1e.firebaseapp.com",
  databaseURL: "https://client-panel-e0b1e.firebaseio.com",
  //projectId: "client-panel-e0b1e",
  storageBucket: "client-panel-e0b1e.appspot.com",
  messagingSenderId: "592152272483"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),

    // Initialize Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    
    FormsModule,
    FlashMessagesModule
  ],
  providers: [ 
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    AuthService,
    AuthGuardService,
    RegisterGuardService,
    SettingsService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
