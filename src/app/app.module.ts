import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// for firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// for Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// for Material
import { MaterialModule } from './material/material.module';
import { DilogUserEditComponent } from './dilog-user-edit/dilog-user-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { RoutingModule } from './routing/routing.module';
import { PassDotterComponent } from './pass-dotter/pass-dotter.component';

@NgModule({
    declarations: [AppComponent, DilogUserEditComponent, UserEditComponent, PassDotterComponent],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        RoutingModule
    ],
    providers: [AngularFirestore],
    bootstrap: [AppComponent],
    entryComponents: [DilogUserEditComponent]
})
export class AppModule {}
