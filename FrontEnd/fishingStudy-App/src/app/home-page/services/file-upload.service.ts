import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { refImage, Documento } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const _baseUrl: string = environment.baseUrl;



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private imageURLS: refImage[] = [];
  constructor(private http: HttpClient) { }

  async updateImage(file: File,
    type: 'usuarios',
    id?: string
  ) {
    try {

      const formData = new FormData();
      formData.append('imagen', file);
      if (type === 'usuarios') {
        const url = `${_baseUrl}/upload/${type}/${id}`;
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('token') || ''
          },
          body: formData
        });
        const data = await res.json();
        if (data.ok) {
          return data.nombreArchivo;
        } else {
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  }

  async loadFile(file: File, type: 'documentos') {
    try {
      const formData = new FormData();
      formData.append('archivo', file);
      if (type === 'documentos') {
        const url = `${_baseUrl}/upload/${type}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'x-token': localStorage.getItem('token') || ''
          },
          body: formData
        });
        const data = await res.json();
        if (data.ok) {
          return data.nombreArchivo;
        } else {
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  }

  addRefImageProfile(imgRef: refImage) {
    this.imageURLS.push(imgRef)
  }

  setURLImageProfile(url: string) {
    this.imageURLS.forEach(e => {
      e.url = url;
    })
  }

  getDocuments() {
    const url = `${_baseUrl}/upload/getDocuments`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')

    return this.http.get<{ documents: Documento[] }>(url, { headers })
  }

  deleteDocument(document: Documento) {
    const url = `${_baseUrl}/upload/documentos/${document._id}`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')

    return this.http.delete(url, { headers });
  }

}
