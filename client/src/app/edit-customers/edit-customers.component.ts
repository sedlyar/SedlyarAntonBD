import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from "../data.service";

enum FORM_ACTION {
  ADD = 1,
  EDIT = 2
}

@Component({
  selector: 'app-edit-сustomers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})
export class EditСustomersComponent implements OnInit {
  public form: FormGroup;
  public action: FORM_ACTION = FORM_ACTION.ADD;
  FORM_ACTION: typeof FORM_ACTION = FORM_ACTION;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditСustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      ful_name: new FormControl(''),
      id_streets:new FormControl(''),
      house_number:new FormControl(''),
      apartment_number:new FormControl(''),
      phone_number: new FormControl('')
  
    });

    if (this.data.item) {
      this.form.patchValue(this.data.item);
      this.action = FORM_ACTION.EDIT;
    }
  }

  async save() {
    if (this.action === FORM_ACTION.EDIT) {
      await this.dataService.putAsync(`/customers/${this.data.item.id}`, this.form.value);
    } else {
      await this.dataService.postAsync('/customers', this.form.value);
    }
    this.dialogRef.close(true);
  }

  async delete() {
    await this.dataService.deleteAsync(`/customers/${this.data.item.id}`);
    this.dialogRef.close(true);
  }
}
