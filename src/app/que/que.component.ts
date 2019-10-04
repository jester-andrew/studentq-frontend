import { Component, OnInit } from '@angular/core';
import { QueServiceService } from '../que-service.service';

@Component({
  selector: 'app-que',
  templateUrl: './que.component.html',
  styleUrls: ['./que.component.css']
})
export class QueComponent implements OnInit {

  selectedLab: String = null;
  studentRequests:any;
  requestRows;
  register:boolean = false;
  labOptions;
  constructor(private qservice: QueServiceService) { }

  ngOnInit() {
    this.selectedLab = localStorage.getItem('selectedLab');
    if(this.selectedLab != null){
      this.getHelpRequests();
    }

    this.qservice.getLabs().subscribe((result:any) => {
      console.log(result);
      let options = '<option value="" disabled>Choose Lab</option>';
      for(let i = 0; i < result.labs.length; i++){
        console.log('in loop')
        if(result.labs[i] === this.selectedLab){
          options += '<option selected>'+result.labs[i]+'</option>'
        }else{
          options += '<option>'+result.labs[i]+'</option>'
        }
      }
      this.labOptions = options;
      console.log(this.labOptions);
    });
  }

  labChange(lab:string){
    console.log(lab);
    localStorage.setItem('selectedLab', lab);
    this.selectedLab = lab;
    this.getHelpRequests();
    
  }

  getHelpRequests(){
    console.log('here');
    this.qservice.getRequests(this.selectedLab).subscribe((result) => {
        console.log(result['returnrd']);
        if(result['returnrd']){
          this.studentRequests = result['result'];
          console.log(this.studentRequests);
        }
    
      let rows = '';
      
      for(let i = 0; i < this.studentRequests.length; i++){
        if(this.studentRequests[i].name === undefined){
          this.studentRequests[i].name = '';
        }
        if(this.studentRequests[i].class === undefined){
          this.studentRequests[i].class = '';
        }
        if(this.studentRequests[i].question === undefined){
          this.studentRequests[i].question = '';
        }
        if(this.studentRequests[i].campus === undefined){
          this.studentRequests[i].campus = '';
        }
        if(this.studentRequests[i].email === undefined){
          this.studentRequests[i].email = '';
        }  
        let row = '<tr>';
            row += '<th scope="col">'+(i+1)+'</th>';
            row += '<td scope="col">'+this.studentRequests[i].name+'</td>';
            row += '<td scope="col">'+this.studentRequests[i].class+'</td>';
            row += '<td scope="col">'+this.studentRequests[i].question+'</td>';
            row += '<td scope="col">'+this.studentRequests[i].campus+'</td>';
            row += '<td scope="col">'+this.studentRequests[i].email+'</td>';
            row += '</tr>';
            rows += row;
      }
      this.requestRows = rows;
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
    
    this.qservice.insertRequest(request).subscribe((result) => {
      console.log(result);
    })
  }
  
}

