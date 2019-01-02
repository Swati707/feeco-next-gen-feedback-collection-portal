import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Surveys } from '../../models/surveys';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  closeResult: string;
  disableCreatePage: boolean = false;
  surveys: Array<Surveys> = [];
  newSurveyCreateTitle: string = "";
  buttonTextToggleClass: string = "hide";
  buttonButtonToggleClass: string = "show";
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // Get all the surveys from backend

    this.surveys.push({
      id: '1',
      name: 'Survey 1'
    });
    this.surveys.push({
      id: '2',
      name: 'Survey 2'
    });
    this.surveys.push({
      id: '3',
      name: 'Survey 3'
    });
  }

  public accordianButtonClick($event) {
    let button = $event.target;
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    button.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = button.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }

  public openFormTitleTextBox() {
    this.buttonTextToggleClass = "show";
    this.buttonButtonToggleClass = "hide";
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      if (this.disableCreatePage) {
        $event.preventDefault();
      } else {
        return true;
      }
    }
  };

  public enableCreatePage() {
    console.log("check");
    this.disableCreatePage = false;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
