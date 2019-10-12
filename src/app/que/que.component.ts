import { Component, OnInit } from '@angular/core';
import { QueServiceService } from '../que-service.service';
import{ LoginService } from '../login.service';

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
  constructor(private qservice: QueServiceService, private loginBroadcast:LoginService) { }

  ngOnInit() {

    let auth = JSON.parse(sessionStorage.getItem('auth'));
    if(auth !== null){
      // if(auth.permissions === "Lab Assistant"){
      //   this.ta = true;
      // }
      localStorage.setItem('selectedLab', auth.lab);
    }

    this.selectedLab = localStorage.getItem('selectedLab');
    if(this.selectedLab != null){
      this.getHelpRequests();
    }

    this.qservice.getLabs().subscribe((result:any) => {
      console.log(result);
      let options = '<option value="" disabled selected>Choose Lab</option>';
      for(let i = 0; i < result.labs.length; i++){
        console.log('in loop')
        if(result.labs[i] === this.selectedLab){
          options += '<option selected>'+result.labs[i]+'</option>'
        }else{
          options += '<option>'+result.labs[i]+'</option>'
        }
      }
      this.labOptions = options;
      
      this.loginBroadcast.brodcast.subscribe((permissions:any) =>{
        if(permissions.permissionsLA || permissions.permissionsPro || permissions.permissionsAdm){
          this.ta = true;
        }else{
          this.ta = false;
        }
        
      });
    });

    
    // setInterval(() => {
    //     this.getHelpRequests()
    // }, 10000);

    this.qservice
      .getRequest()
      .subscribe((requestString: string) => {
        console.log(requestString);
        let request = JSON.parse(requestString);
        console.log(request);
        this.studentRequests = request;
      });
  }

  labChange(lab:string){
    console.log(lab);
    localStorage.setItem('selectedLab', lab);
    this.selectedLab = lab;
    this.getHelpRequests();
    
  }

  getHelpRequests(){
    this.qservice.getRequests(this.selectedLab).subscribe((result) => {
        if(result['returnrd']){
          this.studentRequests = result['result'];
        }
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
      collection: this.selectedLab
    }
    this.qservice.insertRequest(request)
  }

  helpStudent(id){
    console.log(id);
  }

  removeStudent(id){
    // for(let i=0; i < this.studentRequests.length; i++){
    //   if(this.studentRequests[i]._id == id){
    //       this.studentRequests.splice(i,1)
    //   }
    // }
    this.qservice.deleteRequest(id, this.selectedLab)
    // .subscribe((result) =>{
    //   console.log(result);
    // });
  }
}

