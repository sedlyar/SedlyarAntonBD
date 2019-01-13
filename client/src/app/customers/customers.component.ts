import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { EditСustomersComponent } from "../edit-customers/edit-customers.component";
import { MatDialog } from "@angular/material";

import { Customers } from "./customers.model";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [ 
    'id',
    'ful_name',
    'id_streets',
    'house_number',
    'apartment_number',
    'phone_number', 
];
  data: Customers[] = [];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.data = await <Promise<Customers[]>>this.dataService.getAsync('/customers');
  }

    edit(item) {
     const dialogRef = this.dialog.open(EditСustomersComponent, {
      data: { item }
     });

     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         this.getData();
       }
     });
   }
}
