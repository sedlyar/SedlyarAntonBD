import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {
  }

  async login() {
    await this.authService.signIn(this.form.value);
    this.router.navigateByUrl('/vehicles');
  }
}
