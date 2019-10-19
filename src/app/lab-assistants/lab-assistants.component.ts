import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { QueServiceService } from '../que-service.service';

@Component({
  selector: 'app-lab-assistants',
  templateUrl: './lab-assistants.component.html',
  styleUrls: ['./lab-assistants.component.css']
})
export class LabAssistantsComponent implements OnInit {
  labOptions:any;
  constructor(private adminService: AdminService, private qservice: QueServiceService) { }

  ngOnInit() {
    this.qservice.getLabs().subscribe((result:any) => {
      let options = '<option value="" disabled selected>Choose Lab</option>';
      for(let i = 0; i < result.labs.length; i++){
        options += '<option>'+result.labs[i].alias +'</option>'
      }
      this.labOptions = options;
    });
  }

  addAdmin(lab, name, email, password){
    let admin = {
      lab:lab,
      name: name,
      email: email,
      password: password,
      permissions: "Lab Assistant"
    }

    this.adminService.addAdmin(admin).subscribe((result) => {
      console.log(result);
    });
  }

  removeAssistant(id){
    this.adminService.removeAdmin(id).subscribe((result) => {
      console.log(result);
    });
  }

}
