import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FestivalsListComponent } from './components/festival/festivals-list/festivals-list.component';
import { FestivalDetailsComponent } from './components/festival/festival-details/festival-details.component';
import { MessageComponent } from './components/shared/message/message.component';
import { MessageService } from './services/message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './components/root/root.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FestivalEditorListComponent } from './components/festival/festival-editor-list/festival-editor-list.component';
import { EditorDetailsComponent } from './components/festival/editor-details/editor-details.component';
import { FestivalGameListComponent } from './components/festival/festival-game-list/festival-game-list.component';
import { GameDetailsComponent } from './components/festival/game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FestivalsListComponent,
    FestivalDetailsComponent,
    MessageComponent,
    RootComponent,
    FestivalEditorListComponent,
    EditorDetailsComponent,
    FestivalGameListComponent,
    GameDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'festivals', component: FestivalsListComponent },
      { path: 'festivals/:festivalId', component: FestivalDetailsComponent },
      { path: 'App', component: AppComponent },
      { path: '', redirectTo: '/App', pathMatch: 'full' },
      // { path: '**', component: PageNotFoundComponent },
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

  ],
  providers: [MessageService],
  bootstrap: [RootComponent],
})
export class AppModule {}
