import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { QueServiceService } from '../que-service.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  labOptions:any;
  group:any = "Professor";
  admins:any;
  modal:boolean = false;
  constructor(private adminService: AdminService, private qservice: QueServiceService) { }

  ngOnInit() {
    this.qservice.getLabs().subscribe((result:any) => {
      let options = '<option value="" disabled selected>Choose Lab</option>';
      for(let i = 0; i < result.labs.length; i++){
        options += '<option>'+result.labs[i].alias+'</option>'
      }
      this.labOptions = options;
    });

    this.adminService.getAdmins(this.group).subscribe((result:any) => {
      console.log(result);
      this.admins = result.admins;
    });
  }

  addAdmin(lab, name, email, password){
    let admin = {
      lab:lab.value,
      name: name.value,
      email: email.value,
      password: password.value,
      permissions: "Professor"
    }

    this.adminService.addAdmin(admin).subscribe((result) => {
      location.reload();
    });
  }

  removeInstructor(id){
    this.adminService.removeAdmin(id).subscribe((result) => {
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
