import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm!: FormGroup;
  hide: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    });
  }


  login() {
    debugger
    this.api.getDr().subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if (user) {
        alert("Login Success");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }
      else {
        alert("User not found");
      }
    }, err => {
      alert("Something went wrong !");
    })
  }

}
