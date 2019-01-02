import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Surveys } from '../../models/surveys';
import { Questions } from '../../models/questions';

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
  title = "Feedback CS 101";
  editTitle = false;
  editQuestion = [];
  editQuestionType = [];
  questions: Array<Questions> = [];
  questions_len = 0
  multiselect = null;
  options = ['Multi-select', 'Radio', 'Text', 'Boolean'];
  optionSelected: any;


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

  public addQuestion(){
    this.questions_len = this.questions.length + 1
    this.questions.push({
      id: this.questions_len,
      name: null,
      type: null,
      answer: []
    });
    this.editQuestion.push(false);
    this.editQuestion.push(false);
  }

  public editQuestionDetails(index,q){
    this.questions[index].name = q;
    this.editQuestion[index] = false;
  }

  public editQuestionTypeDetails(index,t){
    this.questions[index].type = t;
    this.editQuestionType[index] = false;
    if(t == 'Boolean'){
      this.questions[index].answer.push('True');
      this.questions[index].answer.push('False');
    }
    
  }

  public addMultiSelectOption(index,option){
    this.questions[index].answer.push(option);
    this.multiselect = null
  }

  public setTitleFunction(x){
    this.title = x;
    this.editTitle = false;
  }

  public titleEdit(){
    this.editTitle = true;
  }

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
