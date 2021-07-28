import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AccountSettingComponent } from './pages/account-setting/account-setting.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material/material.module';


@NgModule({
  declarations: [
    EditProfileComponent,
    AccountSettingComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EditProfileModule { }
