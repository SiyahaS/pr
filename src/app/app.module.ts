import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { StationComponent } from './station/station.component';
import { ManageComponent } from './manage/manage.component';
import { YouTubeMediaComponent } from './you-tube-media/you-tube-media.component';
import { ManagementListComponent } from './management-list/management-list.component';
import { MobileComponent } from './mobile/mobile.component';
import { LandingComponent } from './landing/landing.component';

import { MatCardModule, MatButtonModule, MatDividerModule, MatInputModule, MatListModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StationComponent,
    ManageComponent,
    YouTubeMediaComponent,
    ManagementListComponent,
    MobileComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    // Angular Material Imports
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
