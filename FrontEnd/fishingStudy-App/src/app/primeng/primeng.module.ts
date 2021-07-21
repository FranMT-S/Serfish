import { NgModule } from '@angular/core';

import { ScrollTopModule } from 'primeng/scrolltop';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  exports:[
    ScrollTopModule,
    CardModule
  ]
})
export class PrimengModule { }
