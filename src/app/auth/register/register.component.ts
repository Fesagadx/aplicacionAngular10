import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm= new FormGroup({
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onRegister(){
    console.log('Form Register', this.registerForm.value);
  }

  registrarUsuario(){
    this.authService.register(this.registerForm.value.nombres, this.registerForm.value.apellidos,this.registerForm.value.usuario, this.registerForm.value.password)
      .subscribe(resp => {
      console.log('registro ', resp);
    });
  }

}
