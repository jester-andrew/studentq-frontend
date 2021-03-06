import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QueComponent } from './que/que.component';
import { LabInfoComponent } from './lab-info/lab-info.component';
import { LoginComponent } from './login/login.component';
import { LabAssistantsComponent } from './lab-assistants/lab-assistants.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { CoursesComponent } from './courses/courses.component';
import { ReportsComponent } from './reports/reports.component';
import { StartDateComponent } from './start-date/start-date.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'getHelp', component: QueComponent},
  {path: 'labInfo', component: LabInfoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'labAssistants', component: LabAssistantsComponent},
  {path: 'instructors', component: InstructorsComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'semStart', component: StartDateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent, 
  QueComponent, 
  LabInfoComponent, 
  LoginComponent, 
  LabAssistantsComponent, 
  InstructorsComponent,
  CoursesComponent,
  ReportsComponent,
  StartDateComponent
];
