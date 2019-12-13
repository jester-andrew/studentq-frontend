import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QueComponent } from './que/que.component';
import { LabInfoComponent } from './lab-info/lab-info.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SanitizeHTMLPipe } from './sanitize-html.pipe';
import { LabAssistantsComponent } from './lab-assistants/lab-assistants.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { CoursesComponent } from './courses/courses.component';
import { ReportsComponent } from './reports/reports.component';
import { StartDateComponent } from './start-date/start-date.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    QueComponent,
    LabInfoComponent,
    LoginComponent,
    SanitizeHTMLPipe,
    LabAssistantsComponent,
    InstructorsComponent,
    CoursesComponent,
    ReportsComponent,
    StartDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
