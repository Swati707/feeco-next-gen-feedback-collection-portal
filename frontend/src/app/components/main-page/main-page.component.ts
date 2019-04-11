import { Component, OnInit } from '@angular/core';
import { Form } from '../../models/form';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig  } from "@angular/material";
import { CreateFormComponent } from '../../components/create-form/create-form.component';
import { CopyFormComponent } from '../../components/copy-form/copy-form.component';
import { LocalStorageService } from 'angular-web-storage';
import { FormService } from '../../services/form.service';
import { FormCreatorService } from '../../services/form-creator.service';
import { Router } from '@angular/router'

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})


export class MainPageComponent implements OnInit {

  forms: Array<Form> = [];
  form_creator: String;
  default_ques: Array<any> = [];
  constructor(public snackBar: MatSnackBar, private dialog: MatDialog, private router: Router, private formCreatorService: FormCreatorService, public localStorage: LocalStorageService, private fromService: FormService) {
  }

  ngOnInit() {
    // Get all the surveys from backend
    let form_creator = this.localStorage.get('form_creator');
    this.form_creator = form_creator._id;
    this.getAllForms(this.form_creator)
  }

  openFormAddedSnackBar(form) {
    this.snackBar.open(form + " added successfully",null, {
      duration: 2000,
    });
  }

  openFormDeletedSnackBar() {
    this.snackBar.open("form  deleted successfully",null, {
      duration: 2000,
    });
  }

  openStatusSnackBar(form, status) {
    let msg : String;
    if( status == true){
      msg = "activated"
    }
    else{
      msg = "deactivated"
    }

    this.snackBar.open(form +" is successfully " + msg ,null, {
      duration: 2000,
    });
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
        this.default_ques.push({
          question: "Sample Text Question?",
          question_type: "Text",
          possible_answers: [],
          question_number: 1
        },
        {
          question: "Sample Multi Select Question?",
          question_type: "Multi Select",
          possible_answers: ["Option 1", "Option 2", "Option 3"],
          question_number: 2
        },
        {
          question: "Sample Single Select Question?",
          question_type: "Single Select",
          possible_answers: ["Option 1", "Option 2", "Option 3"],
          question_number: 3
        },
        {
          question: "Sample Number Rating Question?",
          question_type: "Number Rating",
          possible_answers: [],
          question_number: 4
        },
        {
          question: "Sample Number Question?",
          question_type: "Number",
          possible_answers: [],
          question_number: 5
        })
        // copy content form data.copyFormId to new
        let formTitle = {
          "name": data.title,
          "form_creator": this.form_creator,
          "anonymous": data.anonymous,
          "questions": this.default_ques
        }

        this.openFormAddedSnackBar(formTitle.name);
        this.fromService.addForm(formTitle).subscribe(
          data => {
            console.log(data, "form creation")
            this.getAllForms(this.form_creator)
          }
        )
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
        this.fromService.getForm(data.copyFormId).subscribe( 
          copied_form => {
            let newForm = {
              name: data.title,
              form_creator: copied_form.form.form_creator,
              questions: copied_form.form.questions,
              anonymous: data.anonymous
            }
            this.fromService.addForm(newForm).subscribe(
              data => {
                console.log(data, "form created")
                this.getAllForms(this.form_creator)
              }
            )
          })
        // this.forms.push({
        //   id: data.copyFormId,
        //   name: data.title
        // });
      });

  }

  getAllForms(id) {
    this.formCreatorService.getCreator(id).subscribe(
      data => {
        console.log(data, "forms_creator");
        this.forms = data.creator.forms;
        console.log(this.forms)
        this.localStorage.set('forms', this.forms)
      }
    )
  }

  deleteForm(id) {
    this.fromService.deleteForm(id).subscribe(
      data => {
        this.getAllForms(this.form_creator);
        this.openFormDeletedSnackBar();
      }
    )
  }

  formState(form) {
    // console.log(form.active_status, e)
    // form.active_status = e.checked;
    form.active_status = !form.active_status
    console.log(form.active_status)
    this.fromService.updateForm(form._id, form).subscribe(
      data => {
        console.log(data, "update form");
        this.formCreatorService.getCreator(this.form_creator).subscribe(
          data => {
            console.log(data, "forms_creator");
            let forms = data.creator.forms;
            console.log(forms)
            this.localStorage.set('forms', forms)
          })
        this.openStatusSnackBar(form.name, form.active_status);
      })
  }

  signout(){
    this.localStorage.remove('form_creator')
    this.localStorage.remove('forms')
    this.router.navigate(['']);
  }

  open_responses(form_id){
    this.router.navigate(['/response_view/' +  form_id]);
  }

  home(){
    this.router.navigate(['/creator']);
  }
}
