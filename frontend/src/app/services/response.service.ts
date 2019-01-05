import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormCreator } from "../models/form_creator"
import { Form } from "../models/form"

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  options = {headers : {'Content-Type': 'application/json'}}
  constructor(private http: HttpClient) { }

  

}
