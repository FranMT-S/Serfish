import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document/document.component';
import { MaterialModule } from '../../../material/material/material.module';

@NgModule({
  declarations: [
    DocumentComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
