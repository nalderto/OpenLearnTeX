import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import { FormsModule } from '@angular/forms';


import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LessonComponent } from './lesson/lesson.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import {ResultDialog} from './lesson/lesson.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



// Import your required language in main.ts or at the root of your application
// see https://codemirror.net/mode/index.html
import 'codemirror/mode/stex/stex';

@NgModule({
  entryComponents: [
    ResultDialog
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserProfileComponent,
    LessonComponent,
    EscapeHtmlPipe,
    ResultDialog

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MDBBootstrapModule.forRoot(),
    AngularFireAuthModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    CodemirrorModule,
    AngularFireFunctionsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: FunctionsRegionToken, useValue: 'us-central1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
