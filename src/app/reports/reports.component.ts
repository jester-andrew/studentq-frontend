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

  //filters
  week:boolean = true;
  month:boolean = false;
  courseValue:string = null;

  timeScope:string = 'week';
  timeCourse:string;

  //time values
  wLong;
  wShort;
  wAvg;

  hLong;
  hShort;
  hAvg;

  //numbers helped
  helpToday:number;
  helpWeek:number;
  helpMonth:number;
  helpSemester:number;

  constructor(private report:ReportsService, private courseService: CourseService ) { }

  ngOnInit() {
    this.report.getBulkReport().subscribe((response:any) => {
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
    });
  }

  changeReportScope(option){
    if(option == 1){
      this.week = true;
      this.month = false;
      //weekly
      if(this.courseValue == null || this.courseValue == undefined){
        this.qrReports = this.bulkReport.week.sessions
      }else{
        this.qrReports = this.bulkReport.week.sessions.filter((value) => value.class == this.courseValue);
      }
    }else{
      this.week = false;
      this.month = true;
      //monthly
      if(this.courseValue == null || this.courseValue == undefined){
        this.qrReports = this.bulkReport.month.sessions;
      }else{
        this.qrReports = this.bulkReport.month.sessions.filter((value) => value.class == this.courseValue);
      }
    }
  }

  changeCourse(course){
    if(course == 'All'){
      this.courseValue = null;
      if(this.week){
        this.qrReports = this.bulkReport.week.sessions
      }else{
        this.qrReports = this.bulkReport.month.sessions
      }
    }else{
      this.courseValue = course;

      if(this.week){
        this.qrReports = this.bulkReport.week.sessions.filter((value) => value.class == this.courseValue);
      }else{
        this.qrReports = this.bulkReport.month.sessions.filter((value) => value.class == this.courseValue);
      }
    }
  }

  changeReportView(reportOption){
    if(reportOption == 1){ //question/report
      this.questionReport = true;
      this.times = false;
      this.numbers = false;
    }else if(reportOption == 2){//lab times
      this.calculateTimes();
      this.questionReport = false;
      this.times = true;
      this.numbers = false;
    }else{//numbers helped
      this.calculateNumbers();
      this.questionReport = false;
      this.times = false;
      this.numbers = true;
    }
  }

  private calculateTimes(){

    let timeInMS = this.calculateMS();
    let waitTimes = timeInMS.wait;
    let helpTimes = timeInMS.help;

    //calcumate max times 
    this.wLong =  this.caluclateHourMinSec(Math.max(...waitTimes));
    this.hLong =  this.caluclateHourMinSec(Math.max(...helpTimes));

    //calulate min times
    this.wShort =  this.caluclateHourMinSec(Math.min(...waitTimes));
    this.hShort =  this.caluclateHourMinSec(Math.min(...helpTimes));
    
    //calculate average times
    this.wAvg = this.caluclateHourMinSec(this.calculateAVG(waitTimes));
    this.hAvg = this.caluclateHourMinSec(this.calculateAVG(helpTimes));
    

  }

  checkInvalidValue(value){
    if(Object.is(value.sec, NaN) || value.sec == Infinity || value.sec == -Infinity){
      value.sec = 'No Data';
    }else if(value.sec < 10){
      value.sec = '0'+value.sec;
    }
    if(Object.is(value.min, NaN) || value.min == Infinity || value.min == -Infinity){
      value.min = '';
    }else if(value.min < 10){
      value.min = '0'+value.min;
    }
    if(Object.is(value.hour, NaN) || value.hour == Infinity || value.hour == -Infinity){
      value.hour = '';
    }else if(value.hour < 10){
      value.hour = '0'+value.hour;
    }

    return value;
  }

  caluclateHourMinSec(timeMS){
    let hour = Math.floor(timeMS / 1000 / 60 / 60);
    let hourMS = hour * 1000 * 60 * 60
    let min = Math.floor((timeMS - hourMS) / 1000 / 60);
    let minMS = min * 1000 * 60;
    let sec = Math.floor((timeMS - (hourMS + minMS)) / 1000 );


    let time = {
      hour: hour,
      min: min, 
      sec: sec
    }
    time = this.checkInvalidValue(time);
    

    return time;
  }

  calculateAVG(numArray){
    let total = 0;
    let arrayLength = numArray.length;

    for(let i = 0; i < arrayLength; i++){
      total += numArray[i];
    }

   return Math.floor(total / arrayLength);
  }

  calculateMS(){
    let waitTimes = [];
    let helpTimes = [];
    
    let targetArray = this.bulkReport[this.timeScope].sessions;
  
    if(this.timeCourse != null || this.timeCourse != undefined){
      targetArray = targetArray.filter((value) => value.class == this.timeCourse);
    }

    //get times in MS
    for (let i = 0; i < targetArray.length; i++) {
      let qtime = new Date(parseInt(targetArray[i].timeEnteredQue));
      let htime = new Date(parseInt(targetArray[i].timeHelped));
      let endTime = new Date(parseInt(targetArray[i].finishedHelp));
      
      let waitTimeMS:number = htime.getTime() - qtime.getTime();
      let helptimeMS:number = endTime.getTime() - htime.getTime();
  
      waitTimes.push(waitTimeMS);
      helpTimes.push(helptimeMS);
    }
    //remove NaN values if a date isn't stored correctly
    waitTimes = waitTimes.filter(value => value);
    helpTimes = helpTimes.filter(value => value);
    return {wait: waitTimes, help: helpTimes};
  }

  changeTimeScope(timeScope){
    if(timeScope == 1){//weekly
      this.timeScope = 'week';
    }else if(timeScope == 2){//monthly
      this.timeScope = 'month';
    }else{//semester
      this.timeScope = 'semester'
    }

    this.calculateTimes();
  }

  changeTimeCourse(course){
    if(course == 'All'){
      this.timeCourse = null;
    }else{
      this.timeCourse = course;
    }
    this.calculateTimes();
  }

  calculateNumbers(){
    this.helpWeek = this.bulkReport.week.sessions.length;
    this.helpMonth = this.bulkReport.month.sessions.length;
    this.helpSemester = this.bulkReport.semester.sessions.length;

    let todayArray = [];
    for(let i = 0; i < this.helpWeek; i++){
      todayArray = this.bulkReport.week.sessions.filter((value) => this.isToday(new Date(value.finishedHelp)));
    }

    this.helpToday = todayArray.length;
  }

  isToday(someDate){
    let today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }
}
