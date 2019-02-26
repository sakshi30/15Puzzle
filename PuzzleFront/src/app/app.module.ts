import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { HomeComponent } from './home/home.component';
import { DataTransferService } from './service/data-transfer.service';
import { baseURL } from './baseUrl';
import {MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScoreComponent } from './score/score.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './service/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PuzzleComponent,
    HomeComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [DataTransferService, {provide: 'BaseURL', useValue: baseURL}, AuthGuardService,
              {
                  provide: HTTP_INTERCEPTORS,
                  useClass: AuthInterceptor,
                  multi: true
                },
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: UnauthorizedInterceptor,
                  multi: true
                }],
  bootstrap: [AppComponent]
})
export class AppModule { }
