import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DomainService } from './domain.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private domain:string = this.ds.getDomain(); 
  private getCoursesAPI:string = this.domain + 'getCourses';
  private addCourseAPI:string = this.domain + 'addCourse';
  private deleteCourseAPI:string = this.domain + 'deleteCourse';
  private getlabCoursesAPI:string = this.domain + 'getlabCourses'
  constructor(private http: HttpClient, private ds:DomainService) { }

  getAllCourses(){
    return this.http.get(this.getCoursesAPI);
  }

  addCourse(course){
    let body = JSON.stringify(course);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.addCourseAPI, body, options);
  }

  deleteCourse(id){
    let body = JSON.stringify({id});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.deleteCourseAPI, body, options);
  }

  getlabCourses(lab){
    let body = JSON.stringify({lab});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.getlabCoursesAPI, body, options);
  }

}
