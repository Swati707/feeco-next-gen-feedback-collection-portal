import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseService } from '../../services/response.service';
import { LocalStorageService } from 'angular-web-storage';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'response-id',
  templateUrl: './response-id.component.html',
  styleUrls: ['./response-id.component.scss']
})
export class ResponseIdComponent implements OnInit {

  r_id;
  answers;
  questions;
  r_email;
  question_answers = [];
  anonymous;
  constructor( private fromService: FormService, public localStorage: LocalStorageService, private router: Router, private responseService: ResponseService, private route: ActivatedRoute, ) {
    this.route.params.subscribe(params => {
      this.r_id = params['_id']
      this.getResponsesId(this.r_id);
    })
    console.log(this.r_id)
  }


  ngOnInit() {
  }

  getResponsesId(r_id) {
    this.responseService.getResponse(r_id).subscribe(
      data => {
        console.log(data);
        this.answers = data.response.answers
        this.questions = data.response.form_id.questions;
        this.r_email = data.response.respondent.email;
        this.anonymous = data.response.form_id.anonymous;
        this.sort_question_answers(this.answers, this.questions)
      });
  }

  sort_question_answers(answers, questions) {
    for (let question of questions) {
      let combo = {
        q: question.question,
        a: 'N/A'
      }
      for (let answer of answers) {
        if (question._id == answer.question_id) {
          combo.a = answer.answer;
        }
      }
      if (combo.q) {
        this.question_answers.push(combo);
      }
    }
    console.log(this.question_answers)
  }

  signout(){
    this.localStorage.remove('form_creator')
    this.localStorage.remove('forms')
    this.router.navigate(['']);
  }

  home(){
    this.router.navigate(['/creator']);
  }

  // getForm(){
  //   this.fromService.getForm(this.form_id).subscribe(
  //     data => {
  //       console.log(data);
  //       this.anonymous = data.form.anonymous
  //       console.log(this.anonymous)
  //     });
  // }
}
