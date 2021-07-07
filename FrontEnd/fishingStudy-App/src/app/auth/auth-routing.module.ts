import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  { 
    path:"login",
    component: LoginComponent
  },
  { 
    path:"reset/:token",
    component: ResetPasswordComponent
  },
  {
    path: "", 
    redirectTo: "login", 
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
