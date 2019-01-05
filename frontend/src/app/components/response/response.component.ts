import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';
import { FormCreatorService } from '../../services/form-creator.service';
import { LocalStorageService } from 'angular-web-storage';

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
  constructor(private formCreatorService: FormCreatorService, public localStorage: LocalStorageService, private fromService: FormService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(params => {
      this.form_id = params['_id']
    })
    this.fromService.getForm(this.form_id).subscribe(
      data => {
        this.form = data.form
        this.form_name = data.form.name
        this.questions = data.form.questions;
      }
    )
  }

  ngOnInit() {
  }

  formatLabel(value: number | null) {
    return value;
  }
}
