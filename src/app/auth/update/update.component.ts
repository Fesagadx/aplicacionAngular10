import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  actualizarForm= new FormGroup({
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl('')
  });

  nom:string;
  ape:string;
  usu:string;
  datoUsuario:any;
  usuarioSel:any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 

    this.datoUsuario = JSON.parse(localStorage.getItem('usuSel'));
    console.log(this.datoUsuario);
    this.nom=this.datoUsuario.nombres;
    this.ape=this.datoUsuario.apellidos;
    this.usu=this.datoUsuario.usuario;

    console.log(this.nom);
    console.log(this.ape);
    console.log(this.usu);

    this.usuarioSel={
      id:0,
      nombres:"",
      apellidos:"",
      usuario:"",
      password:"",
      created_at:"",
      updated_at:"",
    }

  }

  ngOnInit(): void {
    
  }

  actualizar(){

    this.usuarioSel={
      id:this.datoUsuario.id,
      nombres:this.actualizarForm.value.nombres,
      apellidos:this.actualizarForm.value.apellidos,
      usuario:this.actualizarForm.value.usuario,
      password:this.actualizarForm.value.password,
      created_at:this.datoUsuario.created_at,
      updated_at:this.datoUsuario.updated_at,
    };

    this.authService.actualizarUsuario(this.usuarioSel).subscribe(
      data =>{
        console.log("data",data)
      }
    );
  }

}
