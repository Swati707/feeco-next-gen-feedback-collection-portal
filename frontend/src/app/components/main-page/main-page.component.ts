import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Form } from '../../models/form';
import { Question } from '../../models/question';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateFormComponent } from '../../components/create-form/create-form.component';
import { CopyFormComponent } from '../../components/copy-form/copy-form.component';


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  closeResult: string;
  // disableCreatePage: boolean = false;
  forms: Array<Form> = [];
  newFormCreateTitle: string = "";
  //buttonTextToggleClass: string = "hide";
  //buttonButtonToggleClass: string = "show";
  //title = "Feedback CS 101";
  //editTitle = false;
  //editQuestion = [];
  //editQuestionType = [];
  //questions: Array<Questions> = [];
  //questions_len = 0
  //multiselect = null;
  //options = ['Multi-select', 'Radio', 'Text', 'Boolean'];
  //optionSelected: any;


  constructor(private modalService: NgbModal, private dialog: MatDialog) {

  }


  ngOnInit() {
    // Get all the surveys from backend


    // this.forms.push({
    //   _id: '1',
    //   name: 'Survey 1',
    // });
    // this.forms.push({
    //   id: '2',
    //   name: 'Survey 2'
    // });
    // this.forms.push({
    //   id: '3',
    //   name: 'Survey 3'
    // });
  }

  openCreateDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.minWidth = '500px';
    const dialogRef = this.dialog.open(CreateFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        // copy content form data.copyFormId to new
        // this.forms.push({
        //   id: data.copy + 100,
        //   name: data.title
        // });
      });
  }

  openCopyDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.minWidth = '500px';
    dialogConfig.data = this.forms;
    console.log(dialogConfig)
    const dialogRef = this.dialog.open(CopyFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        // this.forms.push({
        //   id: data.copyFormId,
        //   name: data.title
        // });
      });

  }

}
