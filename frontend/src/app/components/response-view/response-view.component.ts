import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';
import { FormCreatorService } from '../../services/form-creator.service';
import { ResponseService } from '../../services/response.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'response-view',
  templateUrl: './response-view.component.html',
  styleUrls: ['./response-view.component.scss']
})
export class ResponseViewComponent implements OnInit {

  form_id;
  responses = [];
  constructor(private responseService: ResponseService, private formCreatorService: FormCreatorService, public localStorage: LocalStorageService, private fromService: FormService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(params => {
      this.form_id = params['_id']
       this.getAllResponse(this.form_id);
    })
    console.log(this.form_id)
  }

  ngOnInit() {
   
  }

  getAllResponse(from_id){
    this.responseService.getResponsesOfOneForm(this.form_id).subscribe( data => {
        console.log(data);
        for(let i of data.responses){
          console.log(i)
          this.responses.push(i.answers)
        }
        console.log(this.responses)
    })
  }

}
