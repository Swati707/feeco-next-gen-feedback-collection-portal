import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }
  options = {headers : {'Content-Type': 'application/json'}}
  addForm(form_details) {
    const body = JSON.stringify(form_details)
    return this.http.post<any>('http://localhost:3000/form/add', body , this.options);
  }

  getForm(id) {
    return this.http.get<any>('http://localhost:3000/form/' + id, this.options)
  }

  updateForm(id, form_details) {
    const body = JSON.stringify(form_details)
    return this.http.patch<any>('http://localhost:3000/form/' + id, body, this.options);
  }

  deleteForm(id) {
    console.log('id of deletion', id)
    return this.http.delete<any>('http://localhost:3000/form/' + id, this.options)
  }
}
