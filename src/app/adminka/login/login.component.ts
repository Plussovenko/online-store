import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };

    this.auth.login(user).subscribe((res) => {
      this.form.reset;
      console.log(res);
      this.router.navigate(['/adminka', 'dashboard']);
    });
  }
}
