import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// for firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from './material/material.module';
import { DilogUserEditComponent } from './dilog-user-edit/dilog-user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DilogUserEditComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
  entryComponents: [DilogUserEditComponent]
})
export class AppModule {
}
