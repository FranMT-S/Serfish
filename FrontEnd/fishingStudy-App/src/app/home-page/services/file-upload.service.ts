import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { refImage } from '../interfaces/interfaces';

const _baseUrl:string = environment.baseUrl;



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private imageURLS:refImage[] = [];
  constructor() { }

  async updateImage( file : File,
                     type: 'usuarios',
                     id:string
    ){
    try{
        const url = `${_baseUrl}/upload/${type}/${id}`;
        const formData = new FormData();
        formData.append('imagen',file);

        const res = await fetch( url, {
          method:'PUT',
          headers:{
            'x-token':localStorage.getItem('token') || ''
          },
          body : formData
        });
        const data = await res.json();
        
        if(data.ok){
          return data.nombreArchivo;
        }else{
          return false;
        }
       

    }catch(error){

      return false;

    }
  }

  
  addRefImageProfile(imgRef:refImage){
      this.imageURLS.push(imgRef)
  }

  setURLImageProfile(url:string){ 
    this.imageURLS.forEach(e => {
      e.url = url;
    })
  }




}
