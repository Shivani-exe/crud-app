import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router, TitleStrategy } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private route: Router,
    private snackbar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.api.loginUser().subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          // alert('Login Succesful');
          this.snackbar.open('Logged in Successfully', 'Dismiss', {
            duration: 1000,
          });

          console.log(res);
          localStorage.setItem('token', res[0].token);
          // this.loginForm.value.email == 'shivani.narang@geminisolutions.com'
          //   ? localStorage.setItem('userType', 'admin')
          //   : localStorage.setItem('userType', 'user');
          this.loginForm.reset();

          this.route.navigate(['productList']);
        } else {
          alert('user not found');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
