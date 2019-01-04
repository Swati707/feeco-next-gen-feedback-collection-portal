import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../models/question';

@Component({
  selector: 'editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.scss']
})
export class EditformComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  questionTypes: Array<{
    name: String,
    value: String
  }> = []

  questions: Array<Question> = []

  options = [];
  option;
  qType;
  sliderValue = 0;
  constructor(private fb: FormBuilder) {
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
    // this.firstFormGroup = this.fb.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this.fb.group({
    //   secondCtrl: this.qType
    // });
    // this.thirdFormGroup = this.fb.group({
    //   thirdCtrl: this.options
    // });
  }

  addOption() {
    this.options.push(this.option)
    this.option = null;
  }

  addQuestion() {
    this.questions.push({
      _id: null,
      question: null,
      question_type: null,
      possible_answers: null,
      question_number: null
    }
    )
  }
}
