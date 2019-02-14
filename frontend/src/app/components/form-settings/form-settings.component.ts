import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormRecieverService } from '../../services/form-reciever.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private formRecieverService: FormRecieverService) {
    this.route.params.subscribe(params => {
      this.form_id = params['_id']
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
}
