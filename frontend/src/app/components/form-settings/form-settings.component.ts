import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormRecieverService } from '../../services/form-reciever.service';
import { LocalStorageService } from 'angular-web-storage';
import { FormService } from '../../services/form.service';
import { FormCreatorService } from '../../services/form-creator.service';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig  } from "@angular/material";

@Component({
  selector: 'form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.scss']
})
export class FormSettingsComponent implements OnInit {

  form_id;
  respondents;
  respondents_sent;
  anonymous;
  form_creator;
  form
  constructor(public snackBar: MatSnackBar,private fromService: FormService, public localStorage: LocalStorageService, private router: Router, private route: ActivatedRoute, private formCreatorService: FormCreatorService, private formRecieverService: FormRecieverService) {
    let form_creator = this.localStorage.get('form_creator');
    this.form_creator = form_creator._id;
    this.route.params.subscribe(params => {
      this.form_id = params['_id']
      this.getForm()
    })
    console.log(this.form_id)
  }

  ngOnInit() {
    this.get_all_recievers()
  }

  send_form() {
    let body = {
      form: this.form_id,
      emailids: this.respondents
    }
    this.formRecieverService.addFormReciever(body).subscribe(
      data => {
        console.log(data);
        this.get_all_recievers()
        this.respondents = ''
      });

  }

  get_all_recievers() {
    this.formRecieverService.getAllFormReceiver(this.form_id).subscribe(
      data => {
        console.log(data);
        this.respondents_sent = data.form_receivers
      });
  }

  signout() {
    this.localStorage.remove('form_creator')
    this.localStorage.remove('forms')
    this.router.navigate(['']);
  }

  home() {
    this.router.navigate(['/creator']);
  }

  getForm() {
    this.fromService.getForm(this.form_id).subscribe(
      data => {
        console.log(data);
        this.form = data.form;
        this.anonymous = data.form.anonymous
        console.log(this.anonymous)
      });
  }

  formState() {
    // console.log(form.active_status, e)
    // form.active_status = e.checked;
    this.form.active_status = !this.form.active_status
    console.log(this.form.active_status)
    this.fromService.updateForm(this.form._id, this.form).subscribe(
      data => {
        console.log(data, "update form");
        this.formCreatorService.getCreator(this.form_creator).subscribe(
          data => {
            console.log(data, "forms_creator");
            let forms = data.creator.forms;
            console.log(forms)
            this.localStorage.set('forms', forms)
          })
        this.openStatusSnackBar(this.form.name, this.form.active_status);
      })
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
}
