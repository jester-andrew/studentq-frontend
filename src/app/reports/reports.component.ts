import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  //report sections
  questionReport:boolean = true;
  times:boolean = false;
  numbers:boolean = false;

  //reports
  bulkReport:any;
  qrReports:any;

  //message
  err:boolean = false;
  errMessage:string;

  //courses
  courses:any;

  constructor(private report:ReportsService, private courseService: CourseService ) { }

  ngOnInit() {
    this.report.getBulkReport().subscribe((response:any) => {
      console.log(response);
      if(response.success){
        this.bulkReport = response.response;
        this.qrReports = this.bulkReport.week.sessions;
      }else{
        this.errMessage = response.message;
        this.err = true;
      }
      
    });

    let auth = JSON.parse(sessionStorage.getItem('auth'));
    this.courseService.getlabCourses(auth.lab).subscribe((result:any) => {
      this.courses = result.courses;
      console.log(this.courses);
    });
  }

  changeReportView(option){
    if(option == 1){

    }else if(option == 2){

    }else if(option == 3){

    }
  }
}
