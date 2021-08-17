import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing-page/landing/landing.component';
import { Page404Component } from './shared/page404/page404.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { SectionCreadoresComponent } from './landing-page/components/section-creadores/section-creadores.component';

const routes: Routes = [
  { path: "landing-page" , component: LandingComponent},
  { 
    path: "auth", 
    loadChildren: () => import("./auth/auth.module").then( module => module.AuthModule)
  },
  { 
    path: "team", 
    component: SectionCreadoresComponent
  },
  {
    path:"home-page",
    loadChildren: () => import("./home-page/home-page.module").then( module => module.HomePageModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  { path: "", redirectTo: "landing-page", pathMatch: "full"},
  { path: "**", component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
