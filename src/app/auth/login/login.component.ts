import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mensaje = '';
  loginForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.mensaje = '';
    console.log('login', this.loginForm.value);
    this.authService.login(this.loginForm.value.usuario, this.loginForm.value.password)
      .subscribe(resp => {
        console.log('resp ', resp);
        if (resp.codigo === 200) {
          this.router.navigate(['/home']);
        } else {
          this.mensaje = resp.mensaje;
        }
      });
  }

}
