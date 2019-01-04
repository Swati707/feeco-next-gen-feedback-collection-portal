import { Component, OnInit } from '@angular/core';
import { Form } from '../../models/form';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateFormComponent } from '../../components/create-form/create-form.component';
import { CopyFormComponent } from '../../components/copy-form/copy-form.component';
import { LocalStorageService } from 'angular-web-storage';
import { FormService } from '../../services/form.service';
import { FormCreatorService } from '../../services/form-creator.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  forms: Array<Form> = [];
  form_creator: String
  constructor(private dialog: MatDialog, private formCreatorService: FormCreatorService, public localStorage: LocalStorageService, private fromService: FormService) {
  }

  ngOnInit() {
    // Get all the surveys from backend
    let form_creator = this.localStorage.get('form_creator');
    this.form_creator = form_creator._id;
    this.getAllForms(this.form_creator)
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
        let formTitle = {
          "name": data.title,
          "form_creator": this.form_creator
        }
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
      }
    )
  }

  formState(form, e) {
    console.log(form.active_status, e)
    form.active_status = e.checked;
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
      })
  }
}
