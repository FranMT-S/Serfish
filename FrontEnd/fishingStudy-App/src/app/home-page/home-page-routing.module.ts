import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingGuard } from '../guards/validar-rol.guard';


import { HomeComponent } from './home/home.component';
import { OpeningComponent } from './pages/opening/opening.component';

import { SettingComponent } from './pages/setting/setting.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children:
      [
        { path:"opening", component:OpeningComponent },
        { path:"setting", component:SettingComponent,
          canActivate: [SettingGuard],
          canLoad: [SettingGuard]
          
        },
        // { path:"edit-profile/:uid",component:EditProfileComponent},
        {
          path:"edit-profile/:uid",
          loadChildren: ()=> import("./pages/edit-profile/edit-profile.module").then( module => module.EditProfileModule) 
        },
        {
          path:"calendar",
          loadChildren: () => import("./pages/calendar/calendar.module").then( module => module.CalendarModule)
        },
        {
          path:"chart",
          loadChildren: () => import("./pages/chart/chart.module").then( module => module.ChartModule)
        },
        {
          path:"climate",
          loadChildren: () => import("./pages/climate/climate.module").then( module => module.ClimateModule)
        },
        {
          path:"document",
          loadChildren: () => import("./pages/document/document.module").then( module => module.DocumentModule)
        },
        {
          path:"map",
          loadChildren: () => import("./pages/map/map.module").then( module => module.MapModule)
        },
        {
          path:"survey",
          loadChildren: () => import("./pages/survey/survey.module").then( module => module.SurveyModule)
        },
        { path:"", redirectTo:"opening", pathMatch:"full"}
      ] 
  },
  {
    path:"", redirectTo:"home-page", pathMatch:"full"
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
