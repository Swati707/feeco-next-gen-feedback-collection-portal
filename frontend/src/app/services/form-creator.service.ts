import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FormCreatorService {

  constructor(private http: HttpClient) { }
  options = {headers : {'Content-Type': 'application/json'}}

  signup(FormCreator) {
    const body = JSON.stringify(FormCreator)
    console.log(body, "Frontend")
    return this.http.post<any>('http://localhost:3000/creator/signup', body ,this.options);
  }

  signIn(user_details) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const body = JSON.stringify(user_details)
    console.log(body, "Frontend")
    return this.http.post<any>('http://localhost:3000/creator/signin', body, this.options );
  }

  getCreator(id) {
    return this.http.get<any>('http://localhost:3000/creator/' + id, this.options)
  }

  updateCreator(id, body) {
    return this.http.patch<any>('http://localhost:3000/creator/' + id, body , this.options)
  }

  deleteCreator(id) {
    return this.http.delete<any>('http://localhost:3000/creator/' + id, this.options)
  }
}
