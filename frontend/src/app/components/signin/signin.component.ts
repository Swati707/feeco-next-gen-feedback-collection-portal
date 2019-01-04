import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router'
import { FormCreatorService } from '../../services/form-creator.service'

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private formCreatorService: FormCreatorService) { }
  username: String
  password: string
  formClass: FormGroup
  registered: boolean
  signup_username: String
  signup_password: String
  name: String
  dob: String
  phone: String
  email: String



  ngOnInit() {
    this.formClass = this.fb.group({
      username: [this.username],
      password: [this.password]
    })

    this.registered = false
  }

  signin() {
    // check login credentials
    let userDetails = {
      "username": this.username,
      "password": this.password
    }

    console.log(userDetails, "main-page input")
    this.formCreatorService.signIn(userDetails).subscribe(
      data => {
        console.log(data)
      }
    )
    //this.router.navigate(['\creator']); 
  }

  signup() {
    //  register user
    let userDetails = {
      "username": this.signup_username,
      "password": this.signup_password,
      "name": this.name,
      "dob": this.dob,
      "phone": this.phone,
      "email": this.email,
    }
    console.log(userDetails, "main-page input")
    this.formCreatorService.signup(userDetails).subscribe(
      data => {
        console.log(data)
      }
    )
    this.registered = true
    this.signup_username = null
    this.signup_password  = null
    this.name = null
    this.dob = null
    this.phone = null
    this.email = null
    console.log("Registered")
  }
}
