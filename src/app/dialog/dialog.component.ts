import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  hide: any;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,) { }
  doctorForm!: FormGroup;

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      date: ['', Validators.required],
      degree: ['', Validators.required],
      fee: ['', Validators.required],
    })
    console.log(this.editData);
  }


  addDoctor() {
    console.log(this.doctorForm.value);
    if (this.doctorForm.valid) {
      this.api.postDr(this.doctorForm.value).subscribe({
        next: (res) => {
          alert("Doctor register succesfully")
          this.doctorForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert("Error while register Doctor")
        }
      })
    }
  }
}
