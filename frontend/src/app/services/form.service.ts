import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormCreator } from "../models/form_creator"
import { Form } from "../models/form"


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  addForm(form_details) {
    const body = JSON.stringify(form_details)
    return this.http.post<any>('http://localhost:3000/form/add', body);
  }

  getForm(id) {
    return this.http.get<Form>('http://localhost:3000/form/' + id)
  }

  updateForm(id, form_details) {
    const body = JSON.stringify(form_details)
    return this.http.patch<any>('http://localhost:3000/form/' + id, body);
  }

  deleteForm(id) {
    return this.http.delete<any>('http://localhost:3000/form/' + id)
  }
}
