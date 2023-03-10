import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  title = 'DoctorsCurd';
  public list: any;
  row: any;

  constructor(public dialog: MatDialog, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getAllDoctors() {
    this.api.getDr().subscribe(res => {
      this.list = res
      console.log(this.list)
    })
  }


  // editDoctor(data: any) {
  //   this.dialog.open(DialogComponent, {
  //     width: '40%',
  //     data: data
  //   })
  // }

  deleteDoctor(data: any) {
    this.api.deleteDr(data.id).subscribe(res => {
      alert("Record Deleted");
      this.getAllDoctors()
    })
  }
}
