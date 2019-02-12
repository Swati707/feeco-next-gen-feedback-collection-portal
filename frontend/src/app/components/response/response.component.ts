import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';
import { FormCreatorService } from '../../services/form-creator.service';
import { ResponseService } from '../../services/response.service';
import { LocalStorageService } from 'angular-web-storage';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { VerifyOtpComponent } from '../../components/verify-otp/verify-otp.component';

@Component({
  selector: 'response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  form_id
  form
  form_name
  questions
  answer: {
    question_id: null,
    answer: null
  }

  answers = []

  constructor(private responseService: ResponseService, private dialog: MatDialog, private formCreatorService: FormCreatorService, public localStorage: LocalStorageService, private fromService: FormService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.form_id = params['_id']
    })
    this.fromService.getForm(this.form_id).subscribe(
      data => {
        this.form = data.form
        this.form_name = data.form.name
        this.questions = data.form.questions;
        for (let q of this.questions) {
          if (q.question_type == 'Multi Select') {
            console.log('Multi-select')
            this.answers[q._id] = new Set()
            console.log(this.answers)
          }
        }
      }
    )
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.openOtpDialog()
    });
  }

  formatLabel(value: number | null) {
    return value;
  }

  submitForm() {
    console.log(this.answers)
    let submit_answers = []
    for (let i in this.answers) {
      if (typeof this.answers[i] == 'string' && this.answers[i]) {
        let a = {
          question_id: i,
          answer: this.answers[i]
        }
        submit_answers.push(a)
      }
      if (typeof this.answers[i] == "object"  && this.answers[i].size != 0) {
        let a = {
          question_id: i,
          answer: Array.from(this.answers[i]).toString()
        }
        submit_answers.push(a)
      }
      if (typeof this.answers[i] == "number"  && this.answers[i]) {
        let a = {
          question_id: i,
          answer: this.answers[i].toString()
        }
        submit_answers.push(a)
      }

    }
    console.log(submit_answers)
    let response = {
      form_id: this.form_id,
      email: "anonymo",
      answers: submit_answers
    }
    let result = this.responseService.addResponse(response).subscribe(
      data => {
        console.log(data);
      });
    console.log(result)
    // console.log(this.responseService.getResponse(this.form_id))
  }

  SingleSelection(e, q) {
    console.log(e, q);
    this.answers[q] = e;
  }

  MultiSelection(e, q, ans) {
    console.log(e, q, ans);
    if (e) {
      this.answers[q].add(ans)
    }
    else {
      this.answers[q].delete(ans)
    }
    console.log(this.answers[q])
  }

  openOtpDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.minWidth = '500px';
    // dialogConfig.data = this.forms;
    console.log(dialogConfig)
    const dialogRef = this.dialog.open(VerifyOtpComponent, dialogConfig);

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
