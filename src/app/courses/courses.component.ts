import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { QueServiceService } from '../que-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any;
  labOptions;
  modal:boolean = false;

  constructor(private courseService: CourseService, private qservice:QueServiceService) { }

  ngOnInit() {

    this.courseService.getAllCourses().subscribe((response:any) => {
      this.courses = response.courses;
    });

    this.qservice.getLabs().subscribe((result:any) => {
      let options = '<option value="" disabled selected>Choose Lab</option>';
      for(let i = 0; i < result.labs.length; i++){
        options += '<option>'+result.labs[i].alias +'</option>'
      }
      this.labOptions = options;
    });
  }

  addCourse(lab, name){
    let course = {lab, name};
    this.courseService.addCourse(course).subscribe((result) => {
      //add to list
      location.reload();
    });
  }

  deleteCourse(id){
    this.courseService.deleteCourse(id).subscribe(result => {
      //remove from list
      location.reload();
    });
  }

  openModal(){
    this.modal = true;
  }

  exitModal(){
    this.modal = false;
  }
}
