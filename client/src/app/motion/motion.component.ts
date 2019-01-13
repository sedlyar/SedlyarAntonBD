import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { EditMotionComponent} from "../edit-motion/edit-motion.component";
import { MatDialog } from "@angular/material";

import { Motion } from "./motion";

@Component({
  selector: 'app-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.css']
})
export class MotionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'id_car', 'id_driver', 'id_customers', 'id_dispatcher','money'];
  data: Motion[] = [];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.data = await <Promise<Motion[]>>this.dataService.getAsync('/motion');
  }

  edit(item) {
    const dialogRef = this.dialog.open(EditMotionComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
}
