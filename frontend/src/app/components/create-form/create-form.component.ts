import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  createform: FormGroup;
  title: string;
  anonymous= false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

  }



  ngOnInit() {
    this.createform = this.fb.group({
      title: [this.title ],
      anonymous: [this.anonymous]
  });
  }

  save() {
    this.dialogRef.close(this.createform.value);
  }

  close() {
    this.dialogRef.close();
  }
}
