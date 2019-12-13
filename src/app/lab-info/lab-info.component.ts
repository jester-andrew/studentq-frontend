import { Component, OnInit, ElementRef } from '@angular/core';
import { LabInfoService } from '../lab-info.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-lab-info',
  templateUrl: './lab-info.component.html',
  styleUrls: ['./lab-info.component.css']
})
export class LabInfoComponent implements OnInit {

  labinfo:string = "";
  storeInfo;

  isInstructor:boolean;
  editableLab:string;

  //specific lab info
  labName:string;
  labRoom: String;
  labTimes:any;

  editingLab:any;
  editTimes:string = '';
  days:any = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  mon:any = [];
  tues:any;
  wed:any;
  thurs: any;
  fri:any;
  sat:any

  errMessage:string;
  iserr = false;


  //modal
  isEditing:boolean = false;

  constructor(private labInfoService: LabInfoService, private loginService:LoginService, private elRef:ElementRef) { }

  ngOnInit() {
    this.labInfoService.getInfo().subscribe((info:any) => {
      this.buildInfoTable(info);
      this.storeInfo = info;
    });

    this.isInstructor = this.loginService.isInstructor();

    if(this.isInstructor){
      this.editableLab = this.loginService.getAuthorizedLab();
    }
  }

  
  buildInfoTable(info){
    for(let i = 0; i < info.length; i++){
      let room = info[i].room;
      let lab = info[i].lab;
  
      if(room == null || room == undefined){
        room = '';
      }
  
      if(lab == null || lab == undefined){
        lab = '';
      }
  
      this.labinfo += '<tr>';
      this.labinfo += '<th scope="col">' + lab + ' - ' + room + '</th>';
      
      if(info[i].times != null && info[i].times != undefined){
        let labSchedule = info[i].times; //monday-saturday

        for(let j = 0; j < labSchedule.length; j++){
          this.labinfo += '<td>';
          let weekDay = info[i].times[j];//individual day
          
          for(let k = 0; k < weekDay.length; k++){
            let timeSlot = info[i].times[j][k]; // individual time slots
            this.labinfo += '<span>'+timeSlot+'</span><br>';
          }
        }       
      }
        this.labinfo += '</tr>';
    }
  }

  editLabInfo(){
    //getting the correct lab information
    for (let i = 0; i < this.storeInfo.length; i++){
      
      if(this.storeInfo[i].lab == this.editableLab){
        this.editingLab = this.storeInfo[i];
      }
    } 

    this.mon = this.editingLab.times[0];
    this.tues = this.editingLab.times[1];
    this.wed = this.editingLab.times[2];
    this.thurs = this.editingLab.times[3];
    this.fri = this.editingLab.times[4];
    this.sat = this.editingLab.times[5];


    //setting lab data
    this.labName = this.editingLab.lab;
    this.labRoom = this.editingLab.room;
    this.labTimes = this.editingLab.times;

    this.isEditing = true;
  }

  returnDay(i){
    if(i == 0){//Monday
      return 'Monday';
    }else if(i == 1){//Tuesday  
      return 'Tuesday';
    }else if(i == 2){//Wednesday
      return 'Wednesday';
    }else if(i == 3){//Thursday
      return 'Thursday';
    }else if(i == 4){//Friday
      return 'Friday';
    }else{//Saturday
      return 'Saturday';
    }
  }
  updateLabInfo(lab){
    let room = this.elRef.nativeElement.querySelector('#room').value;
    let newMondayTimeELem = this.elRef.nativeElement.querySelectorAll('.mon');
    let newTuesdayTimeELem = this.elRef.nativeElement.querySelectorAll('.tues');
    let newWednesdayTimeELem = this.elRef.nativeElement.querySelectorAll('.wed');
    let newThursdayTimeELem = this.elRef.nativeElement.querySelectorAll('.thurs');
    let newFridayTimeELem = this.elRef.nativeElement.querySelectorAll('.fri');
    let newSaturdayTimeELem = this.elRef.nativeElement.querySelectorAll('.sat');

    let times = [];
    let mon = [];
    let tues = [];
    let wed = [];
    let thurs = [];
    let fri = [];
    let sat = [];

    for(let i = 0; i < newMondayTimeELem.length; i++){
      let time = newMondayTimeELem[i].value;
      mon.push(time);
    }

    for(let i = 0; i < newTuesdayTimeELem.length; i++){
      let time = newTuesdayTimeELem[i].value;
      tues.push(time);
    }

    for(let i = 0; i < newWednesdayTimeELem.length; i++){
      let time = newWednesdayTimeELem[i].value;
      wed.push(time);
    }

    for(let i = 0; i < newThursdayTimeELem.length; i++){
      let time = newThursdayTimeELem[i].value;
      thurs.push(time);
    }

    for(let i = 0; i < newFridayTimeELem.length; i++){
      let time = newFridayTimeELem[i].value;
      fri.push(time);
    }

    for(let i = 0; i < newSaturdayTimeELem.length; i++){
      let time = newSaturdayTimeELem[i].value;
      sat.push(time);
    }
    
    times.push(mon);
    times.push(tues);
    times.push(wed);
    times.push(thurs);
    times.push(fri);
    times.push(sat);

    let request = {
      "lab": lab,
      "updateObj": {
        "room": room,
        "times": times
      }
    }

    this.labInfoService.updateLabInfo(request).subscribe((response:any) =>{
      if(response.updated){
        this.isEditing = false;
        location.reload();
      }else{
        this.errMessage = "Could not update at this time. Please try again later.";
        this.iserr = true;
      }
    });
  }

  cancelUpdate(){
    this.isEditing = false;
    location.reload();
  }

  addTime(value){
    this[value].push('NEW TIME');
  }

  removeTime(array, index){
    array.splice(index, 1);
  }

}

