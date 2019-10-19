import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabAssistantsComponent } from './lab-assistants.component';

describe('LabAssistantsComponent', () => {
  let component: LabAssistantsComponent;
  let fixture: ComponentFixture<LabAssistantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabAssistantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabAssistantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
