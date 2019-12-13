import { Component, OnInit, ElementRef } from '@angular/core';
import { LabInfoService } from '../lab-info.service';

@Component({
  selector: 'app-start-date',
  templateUrl: './start-date.component.html',
  styleUrls: ['./start-date.component.css']
})
export class StartDateComponent implements OnInit {

  constructor(private labInfo:LabInfoService, private elemRef:ElementRef) { }
  message:string = '';
  ismessage:boolean = false;
  ngOnInit() {
  }

  prepareSystem(date){

      //prepare the system
      this.labInfo.systemSetup(date.value).subscribe(
      response => this.handleResponse(response, date.value),
      error => this.handleError(error)
    );
  }

  handleResponse(response, setDate){
    this.message = 'The system was set with a semester start date of ' + setDate + '.';
    this.ismessage = true;
    this.elemRef.nativeElement.querySelector('#date').value = '';
  }

  handleError(error){
    this.message = 'The system could not be reset at this time, please try again later.';
    this.ismessage = true;

  }
}
