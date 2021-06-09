import { Injectable } from '@angular/core';
import { HOSTAPITEST } from '../../@constants/path';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UsuarioDTO } from 'src/app/model/usuario.model';
import { CollectionResponse, Data } from 'src/app/model/collection-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName = 'usuario';

  constructor(
    private http: HttpClient) {
  }

  login(usuario: string, password: string) {
    return this.http.post(HOSTAPITEST + 'login', {usuario, password})
      .pipe(
        map((response: any) => {
          if (response.codigo === 200) {
            localStorage.setItem(this.userName, JSON.stringify(response.data));
          }
          return response;
        }),
        catchError(this.handleError));
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(this.userName));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  register(nombres:string,apellidos:string, usuario:string, password:string):Observable<any> {

    const url = HOSTAPITEST + 'usuarios';
    return this.http
      .post(url, {nombres, apellidos,usuario,password})
      .pipe(
        map((response: any) => {
          
          return response;
        }),
        catchError(this.handleError)
      );

  }

  logout() {

  }

  getCurrentUser() {

  }

  handleError(error: any): Observable<any> {
    return throwError(error);
  }

  listarUsuarios(parametros: any): Observable <Data<CollectionResponse<UsuarioDTO>>>{
    const params = new HttpParams()
      .set('limit', '' + parametros.limit)
      .set('page', '' + parametros.page);
    console.log("params");
    console.log(params);

    return this.http.get(HOSTAPITEST + 'usuarios', {params: params})
    .pipe(
      map((response: Response) => <any>response as Data<CollectionResponse<UsuarioDTO>>),
      catchError(this.handleError)
    );

  }

  actualizarUsuario(usuario:UsuarioDTO): Observable<UsuarioDTO>{
    const url = HOSTAPITEST + 'usuarios/:'+usuario.id;
    console.log("url",url);
    console.log("usuario",usuario);
      return this.http.put(url,usuario)
      .pipe(
        map((response: Response) => response,
        console.log("responseActualizar",Response),
        ),
        catchError(this.handleError)
      );
  }

  eliminarUsuario(usuario:UsuarioDTO): Observable<UsuarioDTO>{
    const url = HOSTAPITEST + 'usuarios/:'+usuario.id;
    console.log("url",url);
    console.log("usuario",usuario);
    let Options ={
      headers:new HttpHeaders({
        'Content-type': 'application/json'
      }),
    }
    return this.http.delete(url,Options)
    .pipe(
      catchError(this.handleError)
    );
  }
}
