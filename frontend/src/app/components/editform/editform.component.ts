import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../models/question';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';
import { FormCreatorService } from '../../services/form-creator.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.scss'],

})
export class EditformComponent implements OnInit {

  questionTypes: Array<{
    name: String,
    value: String
  }> = []

  questions: Array<any> = []

  options = [];
  option;
  qType;
  form_id;
  form_name;
  form
  creator_id
  sliderValue = 0;
  constructor(private formCreatorService: FormCreatorService, public localStorage: LocalStorageService, private fromService: FormService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.form_id = params['_id']
    })

    this.fromService.getForm(this.form_id).subscribe(
      data => {
        this.form = data.form
        this.creator_id = data.form.form_creator._id
        this.form_name = data.form.name
        console.log(data, "questions");
        this.questions = data.form.questions;
        console.log(this.questions, "questions 2")
      }
    )

    console.log(this.form_id, "id of creator")
    this.questionTypes.push({
      name: 'Text',
      value: 'T'
    })
    this.questionTypes.push({
      name: 'Multi Select',
      value: 'M'
    })
    this.questionTypes.push({
      name: 'Single Select',
      value: 'SS'
    })
    this.questionTypes.push({
      name: 'Number Rating',
      value: 'NR'
    })
    this.questionTypes.push({
      name: 'Number',
      value: 'N'
    })
  }

  ngOnInit() {
  }

  addOption(possible_answers) {
    if (this.option) {
      console.log("possible_answers", possible_answers)
      possible_answers.push(this.option)
      this.option = null;
    }
  }

  addQuestion() {

    this.questions.push({
      question: null,
      question_type: null,
      possible_answers: [],
      question_number: this.questions.length + 1
    }
    )
  }

  updateQuestion() {
    this.form.questions = this.questions
    this.localStorage.set('forms', JSON.stringify(this.form))
    this.fromService.updateForm(this.form_id, this.form).subscribe(
      data => {
        console.log(data, "update form");
        this.formCreatorService.getCreator(this.creator_id).subscribe(
          data => {
            console.log(data, "forms_creator");
            let forms = data.creator.forms;
            console.log(forms)
            this.localStorage.set('forms', forms)
          })
      })
  }
}
