import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder  } from "@angular/forms";
import { Router } from '@angular/router'

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router) { }
  username:String
  password:string
  formClass : FormGroup
  registered : boolean

  
  ngOnInit() {
    this.formClass = this.fb.group({
      username: [this.username ],
      password: [this.password]
     })

     this.registered = false
  }

  signin(){
    // check login credentials
    this.router.navigate(['\creator']); 
  }

  signup(){
    //  register user
    this.registered = true
    console.log("Registered")
  }
}
