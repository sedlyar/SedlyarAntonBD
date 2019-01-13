import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from "../data.service";

enum FORM_ACTION {
  ADD = 1,
  EDIT = 2
}

@Component({
  selector: 'app-edit-motion',
  templateUrl: './edit-motion.component.html',
  styleUrls: ['./edit-motion.component.css']
})
export class EditMotionComponent implements OnInit {
  public form: FormGroup;
  public action: FORM_ACTION = FORM_ACTION.ADD;
  FORM_ACTION: typeof FORM_ACTION = FORM_ACTION;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditMotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      id_car: new FormControl(''),
      id_driver: new FormControl(''),
      id_customers: new FormControl(''),
      id_dispatcher: new FormControl(''),
      money: new FormControl('')
    });

    if (this.data.item) {
      this.form.patchValue(this.data.item);
      this.action = FORM_ACTION.EDIT;
    }
  }

  async save() {
    if (this.action === FORM_ACTION.EDIT) {
      await this.dataService.putAsync(`/motion/${this.data.item.id}`, this.form.value);
    } else {
      await this.dataService.postAsync('/motion', this.form.value);
    }
    this.dialogRef.close(true);
  }

  async delete() {
    await this.dataService.deleteAsync(`/motion/${this.data.item.id}`);
    this.dialogRef.close(true);
  }
}
