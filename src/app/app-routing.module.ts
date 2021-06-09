import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './@guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },

  { path: 'update', loadChildren: () => import('./auth/update/update.module').then(m => m.UpdateModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
