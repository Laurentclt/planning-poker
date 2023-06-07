import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/core/components/header/header.component';
import { HomeComponent } from './modules/core/components/home/home.component';
import { CreateSessionComponent } from './modules/game/components/create-session/create-session.component';
import { GameSessionComponent } from './modules/game/components/game-session/game-session.component';
import { RecordListComponent } from './modules/records/components/record-list/record-list.component';
import { RecordComponent } from './modules/records/components/record/record.component';
import { RecordDetailComponent } from './modules/records/components/record-detail/record-detail.component';
import {FormsModule} from "@angular/forms";
import { CardComponent } from './modules/shared/components/card/card.component';
import { PlayerCardComponent } from './modules/game/components/game-session/components/player-card/player-card.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreateSessionComponent,
    GameSessionComponent,
    RecordListComponent,
    RecordComponent,
    RecordDetailComponent,
    CardComponent,
    PlayerCardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
