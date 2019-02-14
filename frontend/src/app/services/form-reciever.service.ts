import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FormRecieverService {

  constructor(private http: HttpClient) { }
  options = {headers : {'Content-Type': 'application/json'}}

  addFormReciever(formReciever){
    const body = JSON.stringify(formReciever)
    return this.http.post<any>('http://localhost:3000/formreceiver/add', body , this.options);
  }

  getReceiverFromOTP(otp){
    const body = JSON.stringify(otp)
    return this.http.post<any>('http://localhost:3000/formreceiver/otp', body , this.options);
  }

  getAllFormReceiver(id){
    const body = JSON.stringify(id);
    return this.http.get<any>('http://localhost:3000/formreceiver/form/' + id, this.options);
  }
}
