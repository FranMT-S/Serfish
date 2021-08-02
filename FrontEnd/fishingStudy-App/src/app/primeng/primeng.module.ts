import { NgModule } from '@angular/core';

import { ScrollTopModule } from 'primeng/scrolltop';
import { CardModule } from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {TreeTableModule} from 'primeng/treetable';



@NgModule({
  declarations: [],
  exports:[
    ScrollTopModule,
    CardModule,
    FileUploadModule,
    HttpClientModule,
    TreeTableModule
  ]
})
export class PrimengModule { }
