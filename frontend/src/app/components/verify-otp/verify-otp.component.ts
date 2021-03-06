import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormRecieverService } from '../../services/form-reciever.service';

@Component({
  selector: 'verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  otpform: FormGroup;
  otp: string;
  otp_value:string;

  constructor(private fb: FormBuilder, private formRecieverService:FormRecieverService,
    private dialogRef: MatDialogRef<VerifyOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.otpform = this.fb.group({
      otp: [this.otp],
  });
  }

  submit(){
    let body = {
      otp: this.otp_value
    }
    console.log(body)
    this.formRecieverService.getReceiverFromOTP(body).subscribe(
      data => {
        console.log("Dialog output:", data);
        if(data.success){
          this.dialogRef.close(data);
        }
      });
  }
}
