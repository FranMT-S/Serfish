import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.prod';
import { tap } from 'rxjs/operators';
import { PlaceName } from '../interfaces/interfaces';

interface MarkerResponse {
  ok: boolean;
  marker?: Marker
  markers?: Marker[]
}

interface Marker {
  color: string;
  id?: string;
  lnglat?: string;
  organizacion?: string;
  newMarker?: mapboxgl.Marker;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _baseUrl = environment.baseUrl
  arrayMarkers: Marker[] = []

  get getArrayMarkers() {
    return [...this.arrayMarkers]
  }
  constructor(private http: HttpClient) { }

  newMarker(marker: Marker) {
    const url = `${this._baseUrl}/markers`;
    const { lng, lat } = marker.newMarker!.getLngLat()
    const { color } = marker
    const body = { color, lnglat: `[${lng},${lat}]` }
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.post<MarkerResponse>(url, body, { headers })

  }

  getMarkers() {
    const url = `${this._baseUrl}/markers`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.get<MarkerResponse>(url, { headers })
      .pipe(
        tap(res => {
          this.arrayMarkers = res.markers!
        })
      )
  }

  updateMarker(id: string, body: any) {
    const url = `${this._baseUrl}/markers/${id}`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.put(url, body, { headers }).subscribe(console.log)
  }

  deleteMarker(id: string) {
    const url = `${this._baseUrl}/markers/${id}`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.delete(url, { headers })
      .subscribe(console.log)
  }

  getPlaceName(lng:string,lat:string){
    return this.http.get<PlaceName>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiamVhbmx1Yy1ib3F1aW4iLCJhIjoiY2twZ2gxd3ZpMDJrNzJ1b2x6cHk5c2g5biJ9.M-5ncjMZSY7kMrN9vIsn4g&types=place`)
  }
}
