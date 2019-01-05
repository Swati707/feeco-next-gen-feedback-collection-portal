import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  options = {headers : {'Content-Type': 'application/json'}}
  constructor(private http: HttpClient) { }

  addResponse(response_details){
    const body = JSON.stringify(response_details)
    return this.http.post<any>('http://localhost:3000/response/add', body , this.options);
  }

  getResponse(id){
    return this.http.get<any>('http://localhost:3000/response/' + id , this.options);
  }

  getResponsesOfOneForm(form_id){
    return this.http.get<any>('http://localhost:3000/response/form/' + form_id , this.options);
  }

  

}
