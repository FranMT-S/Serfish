import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import { Documento } from '../../../interfaces/interfaces';
import { environment } from '../../../../../environments/environment.prod';
import { AuthService } from '../../../../auth/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader!:any;

  uploadFile !:File;
  documents: Documento[] = [];

  document: Documento = {
    file : '',        
    name : '',           
    uploadDate : '',      
    ownerDocument: '' 
  };

  constructor(private fileUploadService:FileUploadService, private AuthService:AuthService) { }

  ngOnInit(): void {
    this.fileUploadService.getDocuments().subscribe( ({documents}) =>{
      documents.forEach(doc => { doc.file = `${environment.baseUrl}/upload/documentos/${doc.file}`})
      this.documents = documents
    })
  }

  loadFile(event:any){
    this.uploadFile = event.files[0];
    //console.log(this.uploadFile, 'documentos', this.uploadFile.name, this.AuthService.user.uid)
    this.fileUploadService.loadFile(this.uploadFile, 'documentos').finally(() => {
      Swal.fire({
        icon: 'success',
        title: 'Archivo subido con exito!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.fileUploadService.getDocuments().subscribe(({ documents }) => {
          documents.forEach(doc => { doc.file = `${environment.baseUrl}/upload/documentos/${doc.file}` })
          this.documents = documents
        })})})
    this.fileUploader.clear();
    
  }

  descargar(url:any, name:string){
    const a = document.createElement('a');
    a.href = url;
    a.target="_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
