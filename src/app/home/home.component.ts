import { Component, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { UsuarioDTO } from '../model/usuario.model';
import { NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listaUsuarios: UsuarioDTO[] = [];
  usuarioSel: any;
  miUsuario:number;
  usuSel:number;
  usuario: any;
  numElementos:number;
  page =1;
  limit=10;

  nom:string;
  ape:string;
  usu:string;
  con:string;
  editarForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {

    this.usuarioSel={
      id:0,
      nombres:"",
      apellidos:"",
      usuario:"",
      password:"",
      created_at:"",
      updated_at:"",
    }

    this.miUsuario=0;
    this.usuSel=0;
    
  }

  ngOnInit(){
    this.listarUsuarios();
  }

    editField: string;

    personList: Array<any> = [
      { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
      { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
      { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
      { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
      { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
    ];

    awaitingPersonList: Array<any> = [
      { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
      { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
      { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
      { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
      { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
    ];

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.personList[id][property] = editField;
    }

    remove(id: any) {
      this.awaitingPersonList.push(this.personList[id]);
      this.personList.splice(id, 1);
    }

    add() {
      this.router.navigate(['/register']);
      /*
      if (this.awaitingPersonList.length > 0) {
        const person = this.awaitingPersonList[0];
        this.personList.push(person);
        this.awaitingPersonList.splice(0, 1);
      }
      */
    }
    
    update(idUsuario:number){
      this.miUsuario =idUsuario;
      this.usuSel=this.listaUsuarios[this.miUsuario].id;
      this.usuarioSel={
        id:this.listaUsuarios[this.miUsuario].id,
        nombres:this.listaUsuarios[this.miUsuario].nombres,
        apellidos:this.listaUsuarios[this.miUsuario].apellidos,
        usuario:this.listaUsuarios[this.miUsuario].usuario,
        created_at:this.listaUsuarios[this.miUsuario].created_at,
        updated_at:this.listaUsuarios[this.miUsuario].updated_at,

      };
      localStorage.setItem("usuSel", JSON.stringify(this.usuarioSel));
      this.router.navigate(['/update']);
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
  

  listarUsuarios(){
    const params: any={
      limit: 10,
      page: this.page
    };

    this.authService.listarUsuarios(params)
      .subscribe(resp => {
        console.log('resp ', resp);
        this.listaUsuarios=resp.data.data;
        this.numElementos = resp.data.total;
        
        if(this.numElementos % 10==0){
          this.numElementos = Math.trunc(resp.data.total/10)*10;
        }else{
          this.numElementos = Math.trunc(resp.data.total/10)*10+10;
        }
        

        console.log('listaUsuarios ', this.listaUsuarios);
      });
  }

  deleteUsuario(idUsuario:number){
    this.miUsuario =idUsuario;
    this.usuSel=this.listaUsuarios[this.miUsuario].id;

    this.usuarioSel={
      id:this.listaUsuarios[this.miUsuario].id,
      nombres:this.listaUsuarios[this.miUsuario].nombres,
      apellidos:this.listaUsuarios[this.miUsuario].apellidos,
      usuario:this.listaUsuarios[this.miUsuario].usuario,
      created_at:this.listaUsuarios[this.miUsuario].created_at,
      updated_at:this.listaUsuarios[this.miUsuario].updated_at,

    };

    console.log('id',this.usuSel);
    this.authService.eliminarUsuario(this.usuarioSel).subscribe(
      data =>{
        console.log("data",data)
        this.listarUsuarios();
      }
    );
  }
}