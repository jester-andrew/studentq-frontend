import { Component, OnInit } from '@angular/core';
import { LabInfoService } from '../lab-info.service';
import { Timeouts } from 'selenium-webdriver';

@Component({
  selector: 'app-lab-info',
  templateUrl: './lab-info.component.html',
  styleUrls: ['./lab-info.component.css']
})
export class LabInfoComponent implements OnInit {

  labinfo:string = "";

  constructor(private labInfoService: LabInfoService) { }

  ngOnInit() {
    this.labInfoService.getInfo().subscribe((info:any) => {
      this.buildInfoTable(info);
    });
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
        console.log(labSchedule);
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

}

