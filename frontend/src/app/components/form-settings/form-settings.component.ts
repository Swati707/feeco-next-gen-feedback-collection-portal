import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router'

@Component({
  selector: 'form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.scss']
})
export class FormSettingsComponent implements OnInit {

  form_id;
  respondents;
  respondents_sent;
  anonymous = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.form_id = params['_id']
    })
    console.log(this.form_id)
   }

  ngOnInit(){
  }

  send_form(){
    this.respondents_sent = this.respondents
  }

}
