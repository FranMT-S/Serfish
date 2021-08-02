import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import { Documento } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  uploadFile !:File;
  documents: Documento[] = [];

  document: Documento = {
    file : '',        
    name : '',           
    uploadDate : '',      
    ownerDocument: '' 
  };

   


  constructor(private fileUploadService:FileUploadService) { }

  ngOnInit(): void {
    this.fileUploadService.getDocuments().subscribe( ({documents}) =>{
      this.documents = documents
    })
  }

  loadFile(event:any){
    this.uploadFile = event?.target?.files[0];
    this.fileUploadService.loadFile(this.uploadFile,'documentos',this.document.name, this.document.ownerDocument)
    console.log('evento de carga de archivos invocado')
  }


}
