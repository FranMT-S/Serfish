import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AccountSettingComponent } from './pages/account-setting/account-setting.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

const routes: Routes = [
  {
    path:"",
    component:EditProfileComponent,
    children:[
      {
        path:"edit-profile/:uid",
        component:AccountSettingComponent,
        
      },
      {
        path:"update-password/:uid",
        component:UpdatePasswordComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProfileRoutingModule { }
