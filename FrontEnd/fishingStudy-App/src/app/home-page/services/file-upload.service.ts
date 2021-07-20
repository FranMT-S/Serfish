import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const _baseUrl:string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

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

        return 'nombre de la imagen';

    }catch(error){

      return false;

    }
  }
}
