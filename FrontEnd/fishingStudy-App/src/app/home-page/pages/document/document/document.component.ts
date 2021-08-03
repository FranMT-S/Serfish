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
  canAccess: Boolean = this.authService.user.role === "encuestador" ? false : true


  document: Documento = {
    _id:'',
    file : '',        
    name : '',           
    uploadDate : '',      
    ownerDocument: '' 
  };

  constructor(private fileUploadService:FileUploadService, private authService:AuthService) { }

  ngOnInit(): void {
    this.getDocuments();
  }



  getDocuments(){
    this.fileUploadService.getDocuments().subscribe( ({documents}) =>{
      documents.forEach(doc => {
        if (doc.file !== '') {
          doc.file = `${environment.baseUrl}/upload/documentos/${doc.file}`
        }})
      this.documents = documents
    })
  }

  loadFile(event:any){
    this.uploadFile = event.files[0];
    //console.log(this.uploadFile, 'documentos', this.uploadFile.name, this.authService.user.uid)
    this.fileUploadService.loadFile(this.uploadFile, 'documentos').finally(() => {
      Swal.fire({
        icon: 'success',
        title: 'Archivo subido con exito!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.fileUploadService.getDocuments().subscribe(({ documents }) => {
          documents.forEach(doc => { 
            if(doc.file !== ''){
              doc.file = `${environment.baseUrl}/upload/documentos/${doc.file}` 
            }
          });
          this.documents = documents;
        });
      });
    });
    this.fileUploader.clear();
    
  }

  descargar(url:any, name:string){
    if(url){
      const a = document.createElement('a');
      a.href = url;
      a.target="_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }else{
      Swal.fire({
        background: 'rgba(250,250,250,0.96)',
        title: 'Oops!!',
        text: `Error 504: Archivo no encontrado.`,
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  }
  
  deleteDocument(document:Documento){
    Swal.fire({
      title: 'Borrar documento',
      text: "¿Esta seguro que desea eliminar este archivo de forma permanente?",
      icon: 'question',
      iconColor:'#3085d6',
      showCancelButton: true,
      confirmButtonColor: '#2F6FC6',
      cancelButtonColor: '#2F6FC6',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileUploadService.deleteDocument(document).subscribe( res => {
          Swal.fire({
            title:'Eliminado!',
            text:'Archivo eliminado correctamente',
            icon:'success',
            confirmButtonColor: '#2F6FC6',
          })
          this.getDocuments();
        }
        )
      }
    }).then(() => {
      this.fileUploadService.getDocuments().subscribe(({ documents }) => {
        documents.forEach(doc => {
          if (doc.file !== '') {
            doc.file = `${environment.baseUrl}/upload/documentos/${doc.file}`
          }
        });
        this.documents = documents;
      });
    });
  }
  
}
