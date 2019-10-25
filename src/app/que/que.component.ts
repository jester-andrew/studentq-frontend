import { Component, OnInit } from '@angular/core';
import { QueServiceService } from '../que-service.service';
import{ LoginService } from '../login.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-que',
  templateUrl: './que.component.html',
  styleUrls: ['./que.component.css']
})
export class QueComponent implements OnInit {

  selectedLab: String = null;
  studentRequests:any;
  requestRows:any;
  register:boolean = false;
  labOptions;
  ta:boolean = false;
  helping: boolean = false;
  helpingRow: any;
  isHelping: boolean = false;
  helpingID:number;

  // helping Row values
  startedTime;
  helpedByName;

  courses;
  constructor(private qservice: QueServiceService, private loginBroadcast:LoginService, private courseService: CourseService) { }

  ngOnInit() {

    let auth = JSON.parse(sessionStorage.getItem('auth'));
    if(auth !== null){
      localStorage.setItem('selectedLab', auth.lab);
    }

    this.selectedLab = localStorage.getItem('selectedLab');
    if(this.selectedLab != null){
      this.getHelpRequests();
    }

    this.qservice.getLabs().subscribe((result:any) => {
      let options = '<option value="" disabled selected>Choose Lab</option>';
      for(let i = 0; i < result.labs.length; i++){
        if(result.labs[i] === this.selectedLab){
          options += '<option selected>'+result.labs[i].alias+'</option>'
        }else{
          options += '<option>'+result.labs[i].alias+'</option>'
        }
      }
      this.labOptions = options;
      
      this.loginBroadcast.brodcast.subscribe((permissions:any) =>{
        if(auth != null){
          this.ta = true;
        }else{
          this.ta = false;
        }
      });
    });

    this.qservice
      .getRequest()
      .subscribe((requestString: string) => {
        let request = JSON.parse(requestString);
        console.log(request);
        this.studentRequests = request;
      });

    this.qservice
      .getRow()
      .subscribe((requestString: string) =>{
          let request = JSON.parse(requestString);
          console.log(request);
          this.studentRequests = request;
          //open the help modal
        
          for(let i = 0; i < this.studentRequests.length; i++){
            if(this.studentRequests[i]._id == this.helpingID){
              this.helpingRow = this.studentRequests[i];
              console.log(this.studentRequests[i]);
            }
          }

          this.helpedByName = this.helpingRow.helperName;
          this.startedTime = new Date(this.helpingRow.timeHelped).toLocaleTimeString('en-US');
          this.helping = true;
      }); 

      this.getCourses();
  }

  labChange(lab:string){
    console.log(lab);
    localStorage.setItem('selectedLab', lab);
    this.selectedLab = lab;
    this.getHelpRequests();
    this.getCourses();
  }

  getHelpRequests(){
    this.qservice.getRequests(this.selectedLab).subscribe((result) => {
        if(result['returnrd']){
          this.studentRequests = result['result'];
        }
    });
  }

  getCourses(){
    this.courseService.getlabCourses(this.selectedLab).subscribe((result:any) => {
      this.courses = result.courses;
    });
  }

  openModal(){
    this.register = true;
  }

  closeModal(){
    this.register = false;
  }

  gethelp(name, course, problem, location, email){
    let request = {
      name: name,
      class: course,
      question: problem,
      campus: location,
      email: email,
      collection: this.selectedLab,
      timeEnteredQue: Date.now()
    }
    this.qservice.insertRequest(request);
    this.register = false;
  }

  helpStudent(row){

    if(row.beingHelped != "table-success" && !this.isHelping){
      let auth = JSON.parse(sessionStorage.getItem('auth'));
      this.qservice.updatRequest(row._id, this.selectedLab, auth.name);
      this.helpingID = row._id;
      this.isHelping = true;
    }else{
      this.helpingRow = row;
      this.helpedByName = row.helperName;
      this.startedTime = new Date(row.timeHelped).toLocaleTimeString('en-US');
      this.helping = true;
    }
  }

  helpStudentExit(){
    this.helping = false;
  }

  removeStudent(report){
    this.helpingRow.finishedHelp = Date.now();
    this.helpingRow.report = report;
    this.qservice.saveHelpSession(this.helpingRow, this.selectedLab).subscribe((response:any) => {
      if(response.saved){
        let id = this.helpingRow._id;
        this.qservice.deleteRequest(id, this.selectedLab);
        this.isHelping = false;
      }else{
        alert("Lost connection to the server try again later");
      }
      this.helping = false;
    });
  }
}

