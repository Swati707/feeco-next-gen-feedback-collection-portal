import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Form } from '../../models/form';

@Component({
  selector: 'copy-form',
  templateUrl: './copy-form.component.html',
  styleUrls: ['./copy-form.component.scss']
})
export class CopyFormComponent implements OnInit {

  copyform: FormGroup;
  title: string;
  forms: Array<Form> = [];
  copyFormId: string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CopyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.forms = data;
  }



  ngOnInit() {
    this.copyform = this.fb.group({
      title: [this.title ],
      copyFormId: [this.copyFormId]
  });

  }

  save() {
    this.dialogRef.close(this.copyform.value);
  }

  close() {
    this.dialogRef.close();
  }

}
